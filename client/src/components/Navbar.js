import React, { useContext } from 'react';
import AuthService from '../Services/AuthService';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const Navbar = () => {
  const {isAuthenticated, user, setUser, setIsAuthenticated} = useContext(AuthContext);
  
  const onClickLogoutHandler = () => {
    // const data = AuthService.logout();
    // console.log(data);
    AuthService.logout()
      .then((data) => {
        if(data) {
          setUser(data.user);
          setIsAuthenticated(false);
        }
      })
      .catch(err => console.log(err.message));
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link to='/'>
          <li className='nav-item nav-link'>Home</li>
        </Link>
        <Link to='/login'>
          <li className='nav-item nav-link'>Login</li>
        </Link>
        <Link to='/register'>
          <li className='nav-item nav-link'>Register</li>
        </Link>
      </>
    )
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to='/'>
          <li className='nav-item nav-link'>Home</li>
        </Link>
        <Link to='/todos'>
          <li className='nav-item nav-link'>Todos</li>
        </Link>

        {
          user.role === 'admin' ?
          <Link to='/admin'>
            <li className='nav-item nav-link'>Admin</li>
          </Link>
          :
          null
        }
        <button className="btn btn-link nav-item navlink" type='button' onClick={onClickLogoutHandler}>Logout</button>
      </>
    )
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to='/'>
            <div className="navbar-brand">
              TestCode
            </div>
          </Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
