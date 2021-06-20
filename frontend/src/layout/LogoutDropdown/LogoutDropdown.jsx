import React from 'react';
import { Button } from '../../components/shared/Buttons';
import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid';
import Filter from './Filter';
import AddItem from './AddItem';
import { ReactComponent as Trash } from '../../images/trash.svg';
import DisplayComponent from '../../components/shared/DisplayComponent/DisplayComponent';
import { AuthContext } from '../../context/auth-context';
import CheckBox from '../../components/shared/Input/CheckBox';


const initialTodos =[
  { id: uuidv4(), task: 'Learn React', complete:true, },
  { id: uuidv4(), task: 'Learn Angular',complete:false, },
  { id: uuidv4(), task: 'Learn Vue' ,complete:true,},
  { id: uuidv4(), task: 'Learn Spring',complete:false, },
  { id: uuidv4(), task: 'Learn Css',complete:true, },
];

// reducer functions
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      });
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error();
  }
};


const LogoutDropdown = React.memo(()=> {
    const [todos, dispatchTodos] = React.useReducer(todoReducer, initialTodos);
    const [filter, dispatchFilter] = React.useReducer(filterReducer, 'ALL');
    const auth = React.useContext(AuthContext);
    // const ctx = React.useContext(GithubContext);
    // const TodoContext = React.createContext(null);

    const filteredTodos = todos.filter(todo => {
      if (filter === 'ALL') {
        return true;
      }
   
      if (filter === 'COMPLETE' && todo.complete) {
        return true;
      }
   
      if (filter === 'INCOMPLETE' && !todo.complete) {
        return true;
      }
   
      return false;
    });

    const logout = (event) =>{
      event.preventDefault();
      auth.logout();
    };      

    return (
        <DropdownWrapper>
            <div className="spacer">
                <h4>Todos</h4>
                <Filter dispatch={dispatchFilter} />
                <List list={filteredTodos} 
                  dispatch={dispatchTodos}/>
                <AddItem dispatch={dispatchTodos} />
            </div>
            <Button className="btn"
                  onClick={logout}>
                Logout
            </Button>
        </DropdownWrapper>
    )
});

const List = React.memo(({ list, dispatch }) => {
    return (
      <>
        <ul>
          {list.map((item) => (
            <ListItem key={item.id} item={item} dispatch={dispatch}/>
          ))}
        </ul>
        
    </>
    );
});

const ListItem = React.memo(({ item, dispatch }) => {

  const handleRemove = (id) =>
    dispatch({ type: 'REMOVE_TODO', id });

    return (
      <ListItemWrapper>
        <CheckBox item={item} dispatch={dispatch}>{item.task}</CheckBox>
        <DisplayComponent>
            {() =>  <Trash  onClick={() => handleRemove(item.id)}/>}
        </DisplayComponent>
      </ListItemWrapper>
    );
  });

const DropdownWrapper= styled.div`
    position: absolute;
    width:300px;
    height: 340px;
    display:flex;
    flex-direction: column;
    padding:20px;
    border:1px solid black;
    background-color: white;
    z-index:5;
    top:80px;
    right:2px;

    .spacer{
        position: relative;
        height:240px;
        width:270px;
        display: flex;
        flex-direction:column;
        overflow:scroll
    }

    .btn{
        margin-top:auto;
    }

    .svg{
      cursor:pointer;
    }
    
`;

const ListItemWrapper = styled.li`
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: #FFF;
    box-shadow: 0 8px 5px rgba(0, 0, 0, 0.2);
    margin: 0.5rem auto;
    /* font-size: 20px; */
    max-width: 15rem;
    padding: 0.5rem 1rem,;
`;
export default LogoutDropdown;