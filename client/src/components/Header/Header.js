import React from 'react';
import classes from './Header.module.css';

import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <div className={classes.Header} >
      {/* <img src={Logo} alt="Main Logo" /> */}
      <h1>Covid Assistant</h1>
    </div>
  )
}

export default Header
