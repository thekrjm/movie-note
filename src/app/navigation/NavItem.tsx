'use client';

import Link from 'next/link';
import './NavItem.styles.css';
import { useEffect, useState } from 'react';
import { getUserDataApi } from '../api/movie-note-api';
import { getCookie } from '../util/CookieUtils';
import { INavItem, IUserInfo } from './navigationTypes';


const NavItem = ({isLoggedIn, onClickLogoutHandler, onClickModalSwitch }:INavItem) => {

  const [userData, setUserData] = useState<IUserInfo | null>(null)
  const token = getCookie('accessToken')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const { data } = await getUserDataApi(token);
          setUserData(data)
        }
      } catch (error) {
        console.log("nav useInfo Error", error);
      }
    }
    fetchData()
  },[])

  return (
    <ul className='items-container'>
      <li className='nav-items'>
        <div className='userInfo'>    
          {isLoggedIn ? userData?.nickname+" 님" : null}
        </div>
      </li>
      <li className='nav-items'>
        {isLoggedIn ? (
            <Link href='/board/write'>영화리뷰 작성</Link>
        ) : (
          <div onClick={onClickModalSwitch}>영화리뷰 작성</div>
        )}
      </li>
      <li className='nav-items'>
        {isLoggedIn ? (
          <Link href='/myPage'>내 정보</Link>
        ) : (
          <div onClick={onClickModalSwitch}>내 정보</div>
        )}
      </li>
      <li className='nav-items'>
        {isLoggedIn ? (
          <div onClick={onClickLogoutHandler}>
            로그아웃
          </div>
        ) : (
          <div onClick={onClickModalSwitch}>
            로그인
          </div>
        )}
      </li>
    </ul>
  );
};

export default NavItem;
