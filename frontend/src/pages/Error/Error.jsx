import React from 'react';
import styled from 'styled-components';
import { withRouter} from 'react-router-dom';
const Error = ({error,...props}) => {
  return (
    <Wrapper>
      <div>
        <h1>{error.type}</h1>
        <h3>{error.msg}</h3>
        <button className="btn" onClick={()=> props.history.push('/')}>back home</button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default withRouter(Error);
