'use client';
import './register.style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const url = 'https://movie-note-api.keyworddiary.com/api/v1/auth/sign-up';

    try {
      const respone = await axios.post(url, {
        email,
        name,
        nickname,
        password,
      });
      router.push('/auth/login');
    } catch (error) {
      alert(error);
      console.log('회원가입 오류', error);
    }
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onChangeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <section className='container'>
      <span className='title'>SIGN UP</span>
      <div className='register-box '>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div>
            <label>EMAIL</label>
            <input
              type='text'
              id='email'
              value={email}
              onChange={onChangeEmail}
              required
            />
          </div>
          <div>
            <label>NAME</label>
            <input
              type='text'
              id='name'
              value={name}
              onChange={onChangeName}
              required
            />
          </div>
          <div>
            <label>NICKNAME</label>
            <input
              type='text'
              id='nickname'
              value={nickname}
              onChange={onChangeNickname}
              required
            />
          </div>
          <div>
            <label>PASSWORD</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={onChangePassword}
              required
            />
          </div>
          <button type='submit' className='submit-btn'>
            SIGN UP
          </button>
        </form>
      </div>
    </section>
  );
};
export default RegisterPage;
