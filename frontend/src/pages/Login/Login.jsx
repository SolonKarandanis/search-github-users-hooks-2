import React from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Title from '../../components/shared/Title/Title';
import {AuthContext } from '../../context/auth-context';
import { withRouter} from 'react-router-dom';

const Login = ({...props}) => {
  const {login,user} = React.useContext(AuthContext);
  const [username, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleSubmit = (event) =>{
    event.preventDefault();
    // console.log({username:username, password:password})
    login({username,password});

    if(user){
      props.history.push('/');
    }else{
      // console.log(user);
    }
    
    // sessionStorage.setItem('isLoggedIn', true);
  };

  return (
    <Wrapper>
      <FormDisplay onSubmit={handleSubmit}>
        <div className="login-div">
          <Title title="login" center/>
          <div className="fields">
            <section className="username">
              <svg fill="#999" className="svg-icon" viewBox="0 0 20 20">
                <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
              </svg>
              <input type="username" 
                    className="user-input"
                    placeholder="username"
                    required
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(event)=>setUserName(event.target.value)}/>
            </section>
            <section className="password">
              <svg fill="#999" className="svg-icon" viewBox="0 0 20 20">
                <path d="M17.308,7.564h-1.993c0-2.929-2.385-5.314-5.314-5.314S4.686,4.635,4.686,7.564H2.693c-0.244,0-0.443,0.2-0.443,0.443v9.3c0,0.243,0.199,0.442,0.443,0.442h14.615c0.243,0,0.442-0.199,0.442-0.442v-9.3C17.75,7.764,17.551,7.564,17.308,7.564 M10,3.136c2.442,0,4.43,1.986,4.43,4.428H5.571C5.571,5.122,7.558,3.136,10,3.136 M16.865,16.864H3.136V8.45h13.729V16.864z M10,10.664c-0.854,0-1.55,0.696-1.55,1.551c0,0.699,0.467,1.292,1.107,1.485v0.95c0,0.243,0.2,0.442,0.443,0.442s0.443-0.199,0.443-0.442V13.7c0.64-0.193,1.106-0.786,1.106-1.485C11.55,11.36,10.854,10.664,10,10.664 M10,12.878c-0.366,0-0.664-0.298-0.664-0.663c0-0.366,0.298-0.665,0.664-0.665c0.365,0,0.664,0.299,0.664,0.665C10.664,12.58,10.365,12.878,10,12.878"></path>
              </svg>
              <input type="password" 
                    className="password-input"
                    placeholder="password"
                    required
                    aria-describedby="password-constraints"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}/>
              
            </section>
            {/* <div id="password-constraints">8+ characters with a mix of letters,numbers and symbols</div> */}
            <button className="signin-button">
              Login
            </button>
          </div>
        </div>
      </FormDisplay>
    </Wrapper>
  );
};

const FormDisplay =  React.memo(({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>{children}</form>
));

const Wrapper = styled.div`
  height:100vh;
  width: 100%;
  overflow:hidden;
  font-family: sans-serif;
  font-weight:700;
  display:flex;
  align-items:center;
  justify-content:center;
  color: #555;
  background: #ecf0f3;

  input[type='password']:not(:placeholder-shown):invalid{
    color:red
  }

  .login-div{
    width:430px;
    height:600px;
    padding: 60px 35px 35px 35px;
    border-radius:40px;
    background: #ecf0f3;
    box-shadow: 13px 13px 20px #cbced1,
                -13px -13px 20px #ffffff;
  }

  .title{
    text-align: center;
    font-size:28px;
    padding-top:24px;
    letter-spacing:3px;
  }

  .fields{
    width: 100%;
    padding: 75px 5px 5px 5px;
  }

  .fields input{
    border:none;
    outline:none;
    background:none;
    font-size:18px;
    color: #555;
    padding: 20px 10px 20px 5px;
  }

  .username, .password{
    margin-bottom: 30px;
    border-radius: 25px;
    box-shadow: inset 8px 8px 8px #cbced1,
                inset -8px -8px 8px #ffffff;
  }

  .fields svg{
    height: 22px;
    margin: 0 10px -3px 25px;
  }

  .signin-button {
    outline: none;
    border:none;
    cursor: pointer;
    width:100%;
    height: 60px;
    border-radius: 30px;
    font-size: 20px;
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    color:#fff;
    text-align: center;
    background: #24cfaa;
    box-shadow: 3px 3px 8px #b1b1b1,
                -3px -3px 8px #ffffff;
    transition: 0.5s;
  }
  .signin-button:hover {
    background:#2fdbb6;
  }
  .signin-button:active {
    background:#1da88a;
  }
`;
export default withRouter(Login);
