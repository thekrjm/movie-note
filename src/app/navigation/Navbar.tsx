'use client'

import './Navbar.styles.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { getCookie } from '../util/CookieUtils';
import LoginPage from '../auth/login/page';
import SearchList from './components/searchList';

const Navbar = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = getCookie('accessToken');

  useEffect(() => {
      setIsLoggedin(!isLoggedIn)
  }, [token]);

  const onClickLogoutHandler = () => {
    Cookies.remove('accessToken');
    setIsLoggedin(false)
  };

    const onClickModalSwitch = () => {
    setShowModal(!showModal)
  }

  return (
    <nav className='nav-container'>
      <div className='nav-box'>
        <div className='logo'>
          <Link href='/' className='logo-text'>
            <div>MOVIE</div>
            <div>NOTE</div>
          </Link>
        </div>
        <SearchList/>
        <div className='navItem-wrapper'>
          <NavItem isLoggedIn={isLoggedIn} onClickLogoutHandler={onClickLogoutHandler} onClickModalSwitch={onClickModalSwitch}  />
        </div>
      </div>
      {
        showModal && (
          <div className='login-modal'>
            <div className='login-modal-items'>
              <LoginPage closeLoginModal={onClickModalSwitch} />
            </div>
          </div>
        )
      }
    </nav>
  );
};

export default Navbar;
