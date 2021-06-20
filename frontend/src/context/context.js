import React, { useState, useEffect,useRef } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const gitHubUrl = 'https://api.github.com';
const vesalesUrl='http://localhost:3500';

const vesalesInstance = axios.create({
    baseURL: 'http://localhost:3500',
    headers:{
        Authorization:sessionStorage.getItem('isLoggedIn')
    }
});

// const activeHttpRequests = useRef([]);
// const httpAbortController = new AbortController();
// activeHttpRequests.current.push(httpAbortController);


const GithubContext = React.createContext();

const GithubProvider = React.memo(({children}) =>{
    const [githubUser,setGithubUser]= useState(mockUser);
    const [repos,setRepos]= useState(mockRepos);
    const [followers,setFollowers]= useState(mockFollowers);


    // request and loading and error
    const[requests,setRequests] = useState(0);
    const[isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState({show:false, msg:""});


    // check request rate
    const checkRequests = () =>{
        // console.log('object')
        axios(`${gitHubUrl}/rate_limit`)
        .then(({data})=>{
            let {rate:{remaining}}= data;
            setRequests(remaining);
            if(remaining ===0){
                // throw error
                toggleError(true,'sorry you have exceeded your hourly limit');
            }
        })
        .catch(err => console.log(err))
    };

    function toggleError(show=false,msg=''){
        setError({show,msg});
    };

    function setAxios(method,url){
        return axios({
            method:method,
            url:url,
            headers:{
                Authorization:sessionStorage.getItem('isLoggedIn')
            }
        });
    }

    const searchGithubUser= async (user) =>{
        // toggleError
        setIsLoading(true)
       const response= await axios(`${gitHubUrl}/users/${user}`)
       .catch(err=> console.log(err));
       if(response){
           setGithubUser(response.data);
           const {login, followers_url}= response.data;
            //repos
           axios(`${gitHubUrl}/users/${login}/repos?per_page=100`)
           .then(response => setRepos(response.data));
            //followers    
           axios(`${followers_url}?per_page=100`)
           .then(response =>setFollowers(response.data));

            // wait until both repos and followers are resolved before loading them to screen    
        //    await Promise.allSettled([
        //     axios(`${gitHubUrl}/users/${login}/repos?per_page=100`),
        //     axios(`${followers_url}?per_page=100`)
        //    ]).then((results)=>{
        //        const [repos,followers]= results;
        //        if(repos.status === 'fulfilled'){
        //             setRepos(repos.value.data);
        //        };
        //        if(repos.status === 'fulfilled'){
        //         setFollowers(followers.value.data);
        //        }
        //    });
       }else{
           toggleError(true,'not found')
       }
       checkRequests();
       setIsLoading(false);
    };

    // axios({
//     method: 'get',
//     url: `${vesalesUrl}/auth/login`,
//     headers: {}, 
//     data: {
//       username:username,
//       password:password
//     }
// })

    const fetchAllVeconsum = async () =>{
        setIsLoading(true);
        const response = await setAxios('get',`${vesalesUrl}/getAll`)
            .catch(err=> console.log(err));
    };

    // error

    // useEffect runs after each and every render
    // second parameter is for dependecies, empty array ensures 
    // it only runs once
    useEffect(checkRequests,[]);

    return (<GithubContext.Provider
            value={{
                githubUser,
                repos,
                followers,
                requests,
                error,
                isLoading,
                setGithubUser,
                setRepos,
                setFollowers,
                searchGithubUser,
            }}>
        {children}
    </GithubContext.Provider>);
});



export {GithubProvider, GithubContext};