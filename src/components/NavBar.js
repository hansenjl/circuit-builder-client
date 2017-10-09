import React from 'react';
import { NavLink } from 'react-router-dom';

/* Add basic styling for NavLinks */
const link = {
  width: '100px',
  padding: '12px',
  margin: '6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const NavBar = () => {
  return(
    <div className="navbar">
      <NavLink
        to='/'
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >Home</NavLink>
        <NavLink
        to='/problems'
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >All Circuits</NavLink>
        <NavLink
        to='/problems/new'
        exact
        style={link}
        activeStyle={{
          background: 'darkblue'
        }}
        >New Circuit</NavLink>
    </div>
  )
}

export default NavBar;