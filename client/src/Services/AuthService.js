/* eslint-disable import/no-anonymous-default-export */

export default {
  login: user => {
    return fetch('/user/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  },

  register: user => {
    return fetch('/user/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': "application/json"
      }
    })
      .then(res => res.json())
      .then(data => data);
  },

  logout: () => {
    return fetch('/user/logout', {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log(err.message));
  },

  isAuthenticated: () => {
    return fetch('/user/authenticated')
      .then(res => {
        if(res.status !== 401)
          return res.json().then(data => data);
        else 
          return {isAuthenticated: false, user: {username : '', role: ''}}
      })
  }
};