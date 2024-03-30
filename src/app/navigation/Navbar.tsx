'use client'

import './Navbar.styles.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';
import Cookies from 'js-cookie';
import LoginPage from '../auth/login/page';
import SearchList from './components/searchList';
import { useRecoilState } from 'recoil';
import { isLoggedInState, isLoggedOutState } from '../recoil/RecoilAtom';
import { existAccessTokenCookie } from '../util/CookieUtils';


const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  
  const onClickLogoutHandler = () => {
    Cookies.remove('accessToken');
    setIsLoggedIn(false)
  };

  const onClickModalSwitch = () => {
    setShowModal(!showModal)
  }
  
  useEffect(() => {
    if (existAccessTokenCookie()) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

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
