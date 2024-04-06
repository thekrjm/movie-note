'use client'

import styles from './Navbar.module.css'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NavItem from './NavItem'
import Cookies from 'js-cookie'
import { useSetRecoilState } from 'recoil'
import { logginedUserState } from '../../states/RecoilAtom'
import { getCookie } from '../../utils/cookie'
import { INavUserInfo } from './NavItem.types'
import { getUserDataApi } from '../../api/route'
import LoginPage from '@/containers/login/Login'
import SearchList from '../../components/SearchList'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const setUserData = useSetRecoilState<INavUserInfo | null>(logginedUserState)

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
    <nav className={styles.container}>
      <div className={styles.navBox}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoText}>
            <div>MOVIE</div>
            <div>NOTE</div>
          </Link>
        </div>
        <SearchList />
        <div>
          <NavItem
            onClickLogoutHandler={onClickLogoutHandler}
            onClickModalSwitch={onClickModalSwitch}
          />
        </div>
      </div>
      {showModal && (
        <div className={styles.loginModal} onClick={onClickModalSwitch}>
          <div
            className={styles.loginModalItems}
            onClick={(event) => event.stopPropagation()}
          >
            <LoginPage closeLoginModal={onClickModalSwitch} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
