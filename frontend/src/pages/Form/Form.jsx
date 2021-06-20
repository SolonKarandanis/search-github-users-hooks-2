import React from 'react';
import styled from 'styled-components';
import InputComponent from '../../components/shared/Input/Input';
import {Button, ClearButton} from '../../components/shared/Buttons';
import FinalForm from './FinalForm';
import { VALIDATOR_EMAIL } from '../../components/shared/util/validators';
// import { setRem} from '../../styles';


const Form =  React.memo(({...props}) => {
  // throw Error;
  // console.log(props);
  // local state
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleInput =(event) =>{
    const name = event.target.name;
    const input = event.target.value;
    if(name === 'email'){
      setEmail(input);
    }
    if(name === 'password'){
      setPassword(input);
    }
  };
  
  const handleSubmit = (event) =>{
    // event.preventDefault();
    console.log({emai:email, password:password})
  };

  const clear = () =>{
    setEmail('');
    setPassword('');
  }

    return (
      <>
        <Wrapper>
            <FormDisplay onSubmit={(event)=>{
              event.preventDefault();
              handleSubmit();
            }}>
                <span>Sign in with your email and password</span>
                <InputComponent name="email" 
                        type="email"
                        value={email}
                        handler={handleInput}
                        validators={[VALIDATOR_EMAIL()]}
                        label="email" 
                        isfocus="true" />
                <InputComponent name="password"
                        type="password"
                        value={password}
                        handler={handleInput}
                        validators={[]}
                        label="Password"/>
                <Button primary>
                  Login
                </Button>

                <ClearButton onClick={clear}>
                  Clear
                </ClearButton>
            </FormDisplay>
            
            
            {/* <Slider initial={10}
                    max={25}
                    onChange={value => console.log(value)}/> */}
            {/* <Rotate>&lt; 💅🏾 &gt;</Rotate> */}
        </Wrapper>
        <Wrapper>
          {/* <span>Final Form</span> */}
          <FinalForm onSubmit={handleSubmit} />
          
        </Wrapper>
        <Wrapper>
          <svg width="250" height="250">
            <rect x="25" 
                y="25"
                rx="25"
                ry="100"
                height="200" 
                width="200" 
                fill="lightblue" 
                stroke="black"/>
            <circle 
              r="120" 
              cx="125" 
              cy="125" 
              fill="none" 
              stroke="black"
              strokeWidth="5px"/>
            <circle r="70" cx="125" cy="125" />
          </svg>
        </Wrapper>
        </>
    )
});

const FormDisplay =  React.memo(({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>{children}</form>
));

const Wrapper = styled.section`
  padding: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  
  form{
    width: 30vw;
  }

`;

// const FrmWrapper = styled.form`
//   width: 30vw;
// `;

export default Form;
