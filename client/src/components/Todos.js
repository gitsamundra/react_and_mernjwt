import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import TodoService from '../Services/TodoService';
import Message from './Message';
import TodoItem from './TodoItem';

const Todos = (props) => {
  const authContext = useContext(AuthContext);
  const [todo, setTodo] = useState({name: ''})
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    TodoService.getTodos().then(data => {
      setTodos(data.todos)
    })
  }, []);
  const onChange = e => {
    setTodo({name: e.target.value});
  };

  const resetForm = () => {
    setTodo({name: ''});
  };

  const onSubmit = e => {
    e.preventDefault();
    TodoService.postTodo(todo).then(data => {
      const { message } = data;
      resetForm();
      if(!message.msgError) {
        TodoService.getTodos().then(getData => {
          setTodos(getData);
          setMessage(message);
        });
      } else if(message.msgBody === 'UnAuthorized') {
        setMessage(message);
        authContext.setUset({username: '', role: ''});
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    })
  };

  return (
    <div>
      <ul className='list-group'>
        {
          todos.map(todo => {
            return <TodoItem key={todo._id} todo={todo} />
          })
        }
      </ul>    
      <br/>
      <form onSubmit={onSubmit}>
        <label htmlFor="todo">Enter Todo</label>
        <input 
          type="text" 
          className="form-control" 
          name='todo'
          value={todo.name}
          onChange={onChange}
          placeholder='Enter todo'
        />
        <button className='btn btn-lg btn-primary btn-block mt-4' type='submit'>Submit</button>
      </form>
      {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Todos;
