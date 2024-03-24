import './Navbar.styles.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';
import SearchList from './SearchList';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Navbar = () => {

  const [isLoggedIn, setIsLoggedin] = useState();

  return (
    <nav className='nav-container'>
      <div className='nav-box'>
        <div className='logo'>
          <Link href='/' className='logo-text'>
            <div>MOVIE</div>
            <div>NOTE</div>
          </Link>
        </div>
        <SearchList />
        <div className='navItem-wrapper'>
          <NavItem />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
