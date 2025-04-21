import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ isloggedIn, setIsLoggedin ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedin(auth.loggedIn());
  }, []); // only when loading

  const handleLogout = ()  => {
    auth.logout(); //Delete token
    setIsLoggedin(false); //Updating view
    navigate('/login'); // Redirects to login
  };

  return (
    <div className='nav'>
      <div className='nav-title'>
        {/* <Link to='/'>Krazy Kanban Board</Link> */}
      </div>
      <ul>
      {
        !isloggedIn ? (
          <li className='nav-item'>
            <Link to='/login'>
              <button type='button'>Login</button>
            </Link>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick= {handleLogout}> 
              Logout
            </button>
          </li>
        )
      }
      </ul>
    </div>
  );
};

export default Navbar;