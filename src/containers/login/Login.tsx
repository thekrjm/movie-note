'use client'
import styles from './Login.module.css'
import { ChangeEvent, useRef, useState } from 'react'
import Cookie from 'js-cookie'
import Link from 'next/link'
import { loginApi } from '@/api/route'
import { useSetRecoilState } from 'recoil'
import { logginedUserState } from '@/states/RecoilAtom'
import { ILoginPageProps } from '@/types/types'

const LoginPage = ({ closeLoginModal }: ILoginPageProps) => {
  const [loginData, setLoginData] = useState({
    email: 'thekrjm@naver.com',
    password: 'fbwpaks1',
  })
  const modalRef = useRef<HTMLDivElement>(null)
  const setUserData = useSetRecoilState(logginedUserState)

  const loginHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

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

  const onChangeLoginData = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  return (
    <main>
      <section className={styles.container}>
        <div ref={modalRef}>
          <button onClick={closeLoginModal} className={styles.loginCloseButton}>
            X
          </button>
          <span className={styles.title}>
            <span>MOVIE</span>
            <span>NOTE LOGIN</span>
          </span>
          <div className={styles.loginInfo}>
            <form onSubmit={loginHandleSubmit}>
              <div>
                <label>EMAIL</label>
                <input
                  type="text"
                  id="email"
                  className={styles.loginInput}
                  required
                  onChange={onChangeLoginData}
                />
              </div>
              <div>
                <label>PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  className={styles.loginInput}
                  required
                  onChange={onChangeLoginData}
                />
              </div>
              <button className={styles.loginButton} type="submit">
                LOGIN
              </button>
            </form>
            <div className={styles.registerLinkBox}>
              <span>아직 회원이 아니신가요?</span>
              <Link
                href="/register"
                className={styles.registerLink}
                onClick={() => closeLoginModal()}
              >
                가입하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LoginPage
