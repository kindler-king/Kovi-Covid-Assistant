import React from 'react';
import classes from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../../assets/logo.svg';

const Header = () => {
  return (
    <div className={classes.Header} >
      {/* <img src={Logo} alt="Main Logo" /> */}
      <h1>K<FontAwesomeIcon icon="virus" className={classes.Icon} />vi</h1>
    </div>
  )
}

export default Header
