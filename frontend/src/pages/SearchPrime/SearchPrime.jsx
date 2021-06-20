import React from 'react';
import styled from 'styled-components';
import {FileUpload} from 'primereact/fileupload';


const SearchPrime = () => {
    const handleSubmit = (event) =>{
        // event.preventDefault();
        // console.log({emai:email, password:password})
    };

    return (
        <Wrapper>
            <FormDisplay onSubmit={(event)=>{
              event.preventDefault();
              handleSubmit();
            }}>
                <FileUpload name="demo" url="./upload" accept=".csv"></FileUpload>
            </FormDisplay>
            
        </Wrapper>
    )
};

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

export default SearchPrime;
