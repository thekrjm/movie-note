import './Navbar.styles.css';
import Link from 'next/link';
import React from 'react';
import NavItem from './NavItem';
import SearchList from './SearchList';

const Navbar = () => {
  return (
    <nav className='nav-container'>
      <div className='nav-items'>
        <div className='logo'>
          <Link href='/'>무비노트</Link>
        </div>
        <div><SearchList /></div>
        <div>
          <NavItem />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
