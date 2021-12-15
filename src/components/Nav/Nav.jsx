import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Creative Cook</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/home">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {/* User will not see links if they are not logged in */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/combo">
              Combo
            </Link>

            <Link className="navLink" to="/profile">
              Profile
            </Link>

            <Link className="navLink" to="/ingredients">
              Ingredients
            </Link>

            <Link className="navLink" to="/feed">
              Feed
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
