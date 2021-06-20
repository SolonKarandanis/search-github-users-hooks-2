import React from 'react';
import Datatable from '../../components/shared/Datatable/Datatable';
import styled from 'styled-components';
import { GithubContext } from '../../context/context';

const SearchPage = () => {
    const {followers}= React.useContext(GithubContext);
    
    const data = [
        { firstName: "jane", lastName: "doe", age: 20 },
        { firstName: "john", lastName: "smith", age: 21 }
    ];

    const columnsFollowers =[
      {
        Header:"Avatar",
        accessor:"avatar_url",
        sortType:"basic",
      },
      {
        Header:"Id",
        accessor:"id",
        sortType:"basic",
        filter: "text"
      },
      {
        Header:"Username",
        accessor:"login",
        sortType:"basic",
        filter: "text"
      },
      {
        Header:"User Type",
        accessor:"type",
        sortType:"basic",
        filter: "text"
      },
      {
        Header:"Site admin",
        accessor:"site_admin",
        sortType:"basic",
      },
    ];
    
    const columns= [
        {
            Header: "Name",
            columns: [
              {
                Header: "First Name",
                accessor: "firstName"
              },
              {
                Header: "Last Name",
                accessor: "lastName"
              }
            ]
        },
        {
            Header: "Other Info",
            Footer: "Other Info",
            columns: [
              {
                Header: "Age",
                accessor: "age",
                Footer: info => {
                    const total = React.useMemo(
                      () => info.rows.reduce((sum, row) => row.values.age + sum, 0),
                      [info.rows]
                    );
          
                    return <>Average Age: {total / info.rows.length}</>;
                }
              }
            ]
        }
    ];

    return (
        <Wrapper>
            <Datatable columns={columnsFollowers} data={followers} />
        </Wrapper>
    )
};

export default SearchPage;

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
