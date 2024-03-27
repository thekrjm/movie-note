'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './NavItem.styles.css';
import { useEffect } from 'react';

const NavItem = ({isLoggedIn, onClickLogoutHandler, onClickModalSwitch }:any) => {

  return (
    <ul className='items-container'>
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
