'use client'

import Link from 'next/link'
import './NavItem.styles.css'
import { INavItem } from './navItemTypes'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { isLoggedInState, logginedUserState } from '../recoil/RecoilAtom'

const NavItem = ({ onClickLogoutHandler, onClickModalSwitch }: INavItem) => {
  const userData = useRecoilValue(logginedUserState)
  const isLoggedIn = useRecoilValue(isLoggedInState)

  return (
    <ul className="items-container">
      <li className="nav-items">
        <div className="userInfo">
          {isLoggedIn ? userData!!.nickname + ' 님' : null}
        </div>
      </li>
      <li className="nav-items">
        {isLoggedIn ? (
          <Link href="/board/write">영화리뷰 작성</Link>
        ) : (
          <div onClick={onClickModalSwitch}>영화리뷰 작성</div>
        )}
      </li>
      <li className="nav-items">
        {isLoggedIn ? (
          <Link href="/myPage">내 정보</Link>
        ) : (
          <div onClick={onClickModalSwitch}>내 정보</div>
        )}
      </li>
      <li className="nav-items">
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
