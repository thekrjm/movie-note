'use client'

import Link from 'next/link'
import styles from './NavItem.module.css'
import { INavItem } from './NavItem.types'
import { useRecoilValue } from 'recoil'
import { isLoggedInState, logginedUserState } from '../../states/RecoilAtom'

const NavItem = ({ onClickLogoutHandler, onClickModalSwitch }: INavItem) => {
  const userData = useRecoilValue(logginedUserState)
  const isLoggedIn = useRecoilValue(isLoggedInState)

  return (
    <ul className={styles.container}>
      <li className={styles.navItems}>
        <div className={styles.userInfo}>
          {isLoggedIn ? userData!!.nickname + ' 님' : null}
        </div>
      </li>
      <li className={styles.navItems}>
        {isLoggedIn ? (
          <Link href="/movie-review/write">영화리뷰 작성</Link>
        ) : (
          <div onClick={onClickModalSwitch}>영화리뷰 작성</div>
        )}
      </li>
      <li className={styles.navItems}>
        {isLoggedIn ? (
          <Link href="/my-page">내 정보</Link>
        ) : (
          <div onClick={onClickModalSwitch}>내 정보</div>
        )}
      </li>
      <li className={styles.navItems}>
        {isLoggedIn ? (
          <div onClick={onClickLogoutHandler}>로그아웃</div>
        ) : (
          <div onClick={onClickModalSwitch}>로그인</div>
        )}
      </li>
    </ul>
  )
}

export default NavItem
