import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import Message from './Message';

const Login = (props) => {
  const [user, setUser ] = useState({username: '', password: ''});
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  };



  const onSubmit = e => {
    e.preventDefault()
    AuthService.login(user)
      .then(data => {
        const {isAuthenticated, user, message } = data;
        console.log(user);
        if(isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          props.history.push('/todos');
        } else {
          setMessage(message);
        }
      })
  };

  const onClick = () => {
    
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Please Sign in</h3>
        <label htmlFor="username" className="sr-only mt-2">Username: </label>
        <input 
          type="text" 
          name="username" 
          className="form-control" 
          onChange={onChange} 
          placeholder='Please Enter username'
        />
        <label htmlFor="password" className="sr-only mt-4">Password: </label>
        <input 
          type="password" 
          name="password" 
          className="form-control" 
          onChange={onChange} 
          placeholder='Please Enter password'
        />
        <button 
          className="btn btn-lg btn-primary btn-block mt-3" 
          type='submit'
          onClick={onClick}
        >
          Login
        </button>
      </form>
      {message ? <Message message={message}/> : null}
    </div>
  )
}

export default Login
