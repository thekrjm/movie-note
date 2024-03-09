'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './Navitem.styles.css';
import Cookies from 'js-cookie';
import { getCookie } from '../util/CookieUtils';
import { useRouter } from 'next/navigation';

const NavItem = () => {
  const router = useRouter()
  
  const [accessToken, setAccessToken] = useState<string | null>(null)
  
  useEffect(() => {
    const token = getCookie('accessToken');
    setAccessToken(token || null)
  },[])

  const onClickLogoutHandler = () => {
    Cookies.remove('accessToken')
    setAccessToken(null)
    router.push('/')
  }
  
  const onClickMoveToWrite = () => {
    if (!accessToken) {
      router.push(`/`)
    } else {
      router.push(`/board/write`)
    }
  }
  return (
    <ul className='items-container'>
      <li className='nav-item'>
        {accessToken ?
          <Link href=''>
            영화 리뷰 작성
          
          </Link>  
      }  
      </li>
        <li className='nav-item'>
        {accessToken ? (
          <div onClick={onClickLogoutHandler}>
            <Link href='/'>
              로그아웃
            </Link>
          </div>
          ):(
          <Link href='/auth/login'>
            로그인
          </Link>
        )}    
        </li>
    </ul>
  );
};

export default NavItem;
