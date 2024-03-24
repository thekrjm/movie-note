'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getCookie } from '../util/CookieUtils';
import { useRouter } from 'next/navigation';
import './NavItem.styles.css';
import LoginPage from '../auth/login/page';


const NavItem = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = getCookie('accessToken');
    setAccessToken(token || null);
  }, [accessToken]);

  const onClickLogoutHandler = () => {
    Cookies.remove('accessToken');
    setAccessToken(null);
    router.push('/'); 
  };

  const myPageToLoginPage = () => {
    alert("로그인을 해주세요.")
    router.push('/auth/login')
  }

  const onClickModalSwitch = () => {
    setShowModal(!showModal)
  }

  return (
    <ul className='items-container'>
      <li className='nav-items'>
        {accessToken ? (
            <Link href='/board/write'>영화리뷰 작성</Link>
        ) : (
          <Link href='/auth/login'>영화리뷰 작성</Link>
        )}
      </li>
      <li className='nav-items'>
        {accessToken ? (
          <Link href='/myPage'>내 정보</Link>
        ) : (
          <div onClick={myPageToLoginPage}>내 정보</div>
        )}
      </li>
      <li className='nav-items'>
        {accessToken ? (
          <div onClick={onClickLogoutHandler}>
            <Link  href='/'>로그아웃</Link>
          </div>
        ) : (
          <div onClick={onClickModalSwitch}>
            로그인
          </div>
        )}
      </li>
      {
        showModal && (
          <div className='login-modal'>
            <div className='login-modal-items'>
              <LoginPage closeLoginModal={onClickModalSwitch} />
            </div>
          </div>
        )
      }
    </ul>
  );
};

export default NavItem;
