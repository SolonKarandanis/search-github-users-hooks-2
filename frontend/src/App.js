import React,{lazy, Suspense,useState,useCallback} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './layout/Navbar';
import ErrorBoundary from './components/shared/ErrorBoundary/ErrorBoundary';
import Spinner from './components/shared/Spinner/Spinner';
import { GithubProvider} from './context/context';
import {AuthContext} from './context/auth-context';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// lazy API
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Form = lazy(() => import('./pages/Form/Form'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const Login = lazy(() => import('./pages/Login/Login'));
const Error = lazy(() => import('./pages/Error/Error'));
const Jest = lazy(() => import('./pages/Jest/Jest'));
const SearchPrime = lazy(() => import('./pages/SearchPrime/SearchPrime'));

const App =()=> {
  const {isLoggedIn} = React.useContext(AuthContext);
  let routes;
  if(isLoggedIn){
    routes=(
      <React.Fragment>
        <Route path="/" exact 
            component={Dashboard} />
        <Route path="/form" 
            component={Form} />
        <Route path="/search" 
            component={SearchPage} />
        <Route path="/jest" 
            component={Jest} />
        <Route path="/searchPrime" 
            component={SearchPrime} />
      </React.Fragment>
    );
  }else {
    routes=(
      <React.Fragment>
        <Route path="/login" 
            render={props => <Login />}/>
        <Redirect to="/login" />
      </React.Fragment>
    );
  }

  const Errormsg={
    type:'404',
    msg:'sorry the page you tried cannot be found'
  };
  return (
    // <AuthProvider>
      <Router>
        <NavBar />
        <GithubProvider>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <Switch>
                {routes}
                <Route path="*" 
                    render={props => <Error error={Errormsg} />}/>
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </GithubProvider>
      </Router>
    // </AuthProvider>
  );
}

export default React.memo(App);
