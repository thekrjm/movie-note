'use client'

import './Navbar.styles.css'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'
import Cookies from 'js-cookie'
import SearchList from './components/searchList'
import { useRecoilState } from 'recoil'
import { logginedUserState } from '../recoil/RecoilAtom'
import { getCookie } from '../util/CookieUtils'
import { IUserInfo } from './navItemTypes'
import { getUserDataApi } from '../api/movie-note-api'
import LoginPage from '@/components/ui/login/Login'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const [_, setUserData] = useRecoilState<IUserInfo | null>(logginedUserState)

  const onClickLogoutHandler = () => {
    Cookies.remove('accessToken')
    setUserData(null)
  }

  const onClickModalSwitch = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    const token = getCookie('accessToken')
    if (token !== null) {
      const fetchUserData = async () => {
        try {
          if (token) {
            const { data } = await getUserDataApi(token)
            setUserData(data)
          }
        } catch (error) {
          console.log('nav useInfo Error', error)
        }
      }
      fetchUserData()
    }
  }, [])

  return (
    <nav className="nav-container">
      <div className="nav-box">
        <div className="logo">
          <Link href="/" className="logo-text">
            <div>MOVIE</div>
            <div>NOTE</div>
          </Link>
        </div>
        <SearchList />
        <div className="navItem-wrapper">
          <NavItem
            onClickLogoutHandler={onClickLogoutHandler}
            onClickModalSwitch={onClickModalSwitch}
          />
        </div>
      </div>
      {showModal && (
        <div className="login-modal" onClick={onClickModalSwitch}>
          <div
            className="login-modal-items"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginPage closeLoginModal={onClickModalSwitch} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
