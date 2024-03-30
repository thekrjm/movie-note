'use client'
import './login.style.css'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { loginApi } from '@/app/api/movie-note-api'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { isLoggedInState, logginedUserState } from '@/app/recoil/RecoilAtom'

const LoginPage = ({ closeLoginModal }: any) => {
  const [email, setEmail] = useState('thekrjm@naver.com')
  const [password, setPassword] = useState('fbwpaks1')
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const setUserData = useSetRecoilState(logginedUserState)

  const loginHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!email) {
      alert('이메일을 입력해주세요.')
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.')
    }

    const loginData = {
      email,
      password,
    }
    try {
      const { data } = await loginApi(loginData)
      if (data.accessToken === undefined) {
        alert('로그인에 실패했습니다.')
        return
      }
      // 로그인 성공 페이지로 이동
      if (data && data.accessToken) {
        const token = Cookie.set('accessToken', data.accessToken, {
          expires: 6,
        })
        setUserData(data)
        closeLoginModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <section className="login-container">
      <div ref={modalRef} className="login-modal-wrapper">
        <button onClick={closeLoginModal} className="login-close-button">
          X
        </button>
        <span className="login-title">
          <span>MOVIE</span>
          <span>NOTE LOGIN</span>
        </span>
        <div className="login-box">
          <form onSubmit={loginHandleSubmit}>
            <div>
              <label>EMAIL</label>
              <input
                type="text"
                id="email"
                className="login-input"
                value={email}
                required
                onChange={onChangeEmail}
              />
            </div>
            <div>
              <label>PASSWORD</label>
              <input
                className="login-input"
                type="password"
                id="password"
                value={password}
                required
                onChange={onChangePassword}
              />
            </div>
            <button className="login-btn" type="submit">
              LOGIN
            </button>
          </form>
          <div className="registerLink-box">
            <span>아직 회원이 아니신가요?</span>
            <Link
              href="/auth/register"
              className="registerLink"
              onClick={() => closeLoginModal()}
            >
              가입하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage
