import React from 'react';
import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid';

const AddItem= React.memo(({ dispatch })=>{
    const [task, setTask] = React.useState('');

    const handleSubmit = event => {
        if (task) {
          dispatch({ type: 'ADD_TODO', task, id: uuidv4() });
        }
     
        setTask('');
     
        event.preventDefault();
    };

    const handleChange = event => setTask(event.target.value);

    return(
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={task}
            onChange={handleChange}
          />
          <button type="submit">Add Todo</button>
      </form>
    );
});

export default AddItem;