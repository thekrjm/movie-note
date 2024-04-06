'use client'
import styles from './Register.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

const Register = () => {
  const [registerData, setRegisterData] = useState({
    email: '',
    name: '',
    nickname: '',
    password: '',
  })
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const url = 'https://movie-note-api.keyworddiary.com/api/v1/auth/sign-up'

    try {
      const respone = await axios.post(url, registerData)
      router.push('/auth/login')
    } catch (error) {
      alert(error)
      console.log('회원가입 오류', error)
    }
  }

  const onChangeRegisterData = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  return (
    <main>
      <section className={styles.container}>
        <span className={styles.title}>SIGN UP</span>
        <div className={styles.registerBox}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <div>
              <label>EMAIL</label>
              <input
                className={styles.input}
                type="text"
                id="email"
                onChange={onChangeRegisterData}
                required
              />
            </div>
            <div>
              <label>NAME</label>
              <input
                className={styles.input}
                type="text"
                id="name"
                onChange={onChangeRegisterData}
                required
              />
            </div>
            <div>
              <label>NICKNAME</label>
              <input
                className={styles.input}
                type="text"
                id="nickname"
                onChange={onChangeRegisterData}
                required
              />
            </div>
            <div>
              <label>PASSWORD</label>
              <input
                className={styles.input}
                type="password"
                id="password"
                onChange={onChangeRegisterData}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              SIGN UP
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
export default Register
