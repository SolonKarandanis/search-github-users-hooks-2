import React,{useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import DisplayComponent from '../components/shared/DisplayComponent/DisplayComponent';
import LogoutDropdown from './LogoutDropdown/LogoutDropdown';
import { LinkButton } from '../components/shared/Buttons';
import { AuthContext } from '../context/auth-context';

import { ReactComponent as Avatar } from '../images/avatar.svg';




// Define what props.theme will look like
// const themeSettings = {
//   main: 'mediumseagreen',
// };

const Navbar = React.memo( () =>{
  // const isFirstRender = React.useRef(true);
  // React.useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   }
  // });
  // global context
  
  const [showLogoutDropdown, setShowLogoutDropdown] = React.useState(false);
  const auth = useContext(AuthContext);

  // React.useEffect(()=>{
  //   console.log('navbar')
  // },[showLogoutDropdown]);
  return (
    <Nav>
      <NavHeader>
        <NavLeft>
          <h2>GitHub</h2>
        </NavLeft>

        <NavRight>
          <NavLinks>
          {auth.isLoggedIn && 
              <Link to="/" >
                <LinkButton>
                  Home
                </LinkButton>
              </Link>
            }
            {!auth.isLoggedIn && 
              <Link to="/login" >
                <LinkButton>
                  Login
                </LinkButton>
              </Link>
            }
            
            {auth.isLoggedIn && 
              <Link to="/form" >
                <LinkButton>
                    Form
                </LinkButton>
              </Link>
            }
            
            {auth.isLoggedIn && 
              <Link to="/search" >
                <LinkButton>
                    Search
                </LinkButton>
              </Link>
            }

            {auth.isLoggedIn && 
              <Link to="/searchPrime" >
                <LinkButton>
                    SearchPrime
                </LinkButton>
              </Link>
            }
          </NavLinks>
          {auth.isLoggedIn &&
            <div onClick={()=>setShowLogoutDropdown(!showLogoutDropdown)}>
              <DisplayComponent>
                {() =>  <Avatar />}
              </DisplayComponent>
            </div>
          }
        </NavRight>
        {showLogoutDropdown ===true && auth.isLoggedIn && <LogoutDropdown />}
      </NavHeader>
    </Nav>
  );
});
const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: left;
  align-items: left;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  img {
    width: 35px !important;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Nav = styled.div`
  background: var(--clr-white);
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;

const NavHeader = styled.div`
  // max-width:1010px;
  padding:15px 20px;
  width:100%;
  display:flex;
  align-items:center
`;

const NavLeft = styled.div`
  width: 33.333%;
  text-align:left;
  h2 {
    margin-bottom: 0;
    font-weight: 400;
    
  }
`;

const NavRight = styled.div`
  width: 66.666%;
  text-align: right;
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
`;

const NavLinks = styled.div`

`;

export default Navbar;
