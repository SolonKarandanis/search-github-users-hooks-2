import React from 'react';
import { GithubContext } from '../../../context/context';
import styled from 'styled-components';
// import { WithCondition} from '../components';
// import { VariableSizeList as List, areEqual } from 'react-window';

const Followers = React.memo(() => {
  const {followers}= React.useContext(GithubContext);

  // const rowHeights = new Array(1000)
  //   .fill(true)
  //   .map(() => 25 + Math.round(Math.random() * 50));
 
  // const getItemSize = index => rowHeights[index];

  // const Row = (({ data, index, style }) => {
 
  //   Data passed to List as "itemData" is available as props.data
    
  //   const item = data[index];
   
  //   return (
  //       <article key={item.id}>
  //               <img src={item.avatar_url} alt={item.login}/>
  //               <div>
  //                 <h4>{item.login}</h4>
  //               </div>
  //               <a href={item.html_url}>{item.html_url}</a>
  //       </article>
  //   );
  // });

  // return (
  //   <Wrapper>
  //       {/* <div className="followers"> */}
  //       <List className="followers"
  //           height={500}
  //           itemCount={followers.length}
  //           itemData={followers}
  //           itemSize={getItemSize}
  //           width={500}
  //         >
  //             {Row}
  //         </List>
  //       {/* </div> */}
  //   </Wrapper>
         
  // );

  return (
    <Wrapper>
      <div className="followers">
        {followers.map((follower)=>{
          return(
            <article key={follower.id}>
              <img src={follower.avatar_url} alt={follower.login}/>
              <div>
                <h4>{follower.login}</h4>
              </div>
              <a href={follower.html_url}>{follower.html_url}</a>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.article`
  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: ' followers';
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
  }
  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Followers;
