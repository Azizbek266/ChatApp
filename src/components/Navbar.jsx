import React, { useState, useContext } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className='navbar'>
      <div className="user">
        <img src={currentUser.photoURL} alt="" onClick={toggleDropdown} />
        {dropdownOpen && (
          <div className="dropdown">
            <ul>
              <li>
                <Link to="/update-profile">Update Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  );
};

export default Navbar;
