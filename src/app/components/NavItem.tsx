'use client';

import Link from 'next/link';
import React from 'react';
import './Navitem.styles.css';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '@/commons/token';

const NavItem = (): React.JSX.Element => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  return (
    <ul className='items-container'>
      {accessToken ? (
        <li className='nav-item'>
          <Link href='/'>로그아웃</Link>
        </li>
      ) : (
        <li className='nav-item'>
          <Link href='/auth/login'>로그인</Link>
        </li>
      )}
    </ul>
  );
};

export default NavItem;
