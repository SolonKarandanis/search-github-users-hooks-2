import React from 'react';
import Search from './Search';
import Info from './Info';
import User from './User/User';
import Repos from './Repos';
import WithSpinner from '../../components/HOC/WithSpinner';

import { GithubContext } from '../../context/context';


const Dashboard2 = () =>{
  return (
    <main>
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
}

const DashWithLoading = WithSpinner(Dashboard2);

const Dashboard =  React.memo(() => {
  const {isLoading} = React.useContext(GithubContext);

  return (
   <DashWithLoading  isLoading={isLoading}  />
  );
  
});



export default Dashboard;
