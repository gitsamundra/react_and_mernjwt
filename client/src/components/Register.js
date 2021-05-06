import React, { useEffect, useRef, useState } from 'react';
import AuthService from '../Services/AuthService';
import Message from './Message';

const Register = (props) => {
  const [user, setUser ] = useState({username: '', password: '', role: ''});
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    }
  }, []);

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  const resetForm = () => {
    setUser({username: '', password: '', role: ''});
  }

  const onSubmit = e => {
    e.preventDefault()
    AuthService.register(user)
      .then(data => {
       const { message } = data;
       setMessage(message);
       resetForm();
       
       if(!message) {
         timerID = setTimeout(() => {
          props.history.push('/login');
         }, 2000);
       }
      })
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Register</h3>
        <label htmlFor="username" className="sr-only mt-2">Username: </label>
        <input 
          type="text" 
          name="username" 
          value={user.username}
          className="form-control" 
          onChange={onChange} 
          placeholder='Please Enter username'
        />
        <label htmlFor="password" className="sr-only mt-4">Password: </label>
        <input 
          type="password" 
          name="password" 
          value={user.password}
          className="form-control" 
          onChange={onChange} 
          placeholder='Please Enter password'
        />
        <label htmlFor="role" className="sr-only mt-4">Role: </label>
        <input 
          type="text" 
          name="role" 
          value={user.value}
          className="form-control" 
          onChange={onChange} 
          placeholder='Please Enter role'
        />
        <button 
          className="btn btn-lg btn-primary btn-block mt-3" 
          type='submit'
        >
          Register
        </button>
      </form>
      {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Register;
