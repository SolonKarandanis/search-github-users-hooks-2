import React,{ createContext,useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';

const vesalesUrl='http://localhost:3500';

const AuthContext =createContext();

const AuthProvider =  React.memo(({children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(sessionStorage.getItem('isLoggedIn'));
    const [user ,setUser]= useState();
    // const []=;
        
    const login = async ({username,password})=>{
        const response= await axios(`${vesalesUrl}/auth/login`,{
            params: {
                username:username,
                password:password
            }
        })
        .catch(err=> console.log(err));
        if(response){
            // console.log(response);
            setUser(response.data.results);
            setIsLoggedIn(`Bearer ${response.data.token}`);
            sessionStorage.setItem('isLoggedIn',`Bearer ${response.data.token}`);
        }
            
    };
        
    const logout = React.useCallback(()=>{
            setIsLoggedIn(null);
            setUser(null);
            sessionStorage.removeItem('isLoggedIn');
    },[]);

    
    
    return(<AuthContext.Provider
                value={{
                    isLoggedIn,
                    user,
                    login,
                    logout
                }}>
            {children}
    </AuthContext.Provider>);
});

export {AuthContext,AuthProvider};