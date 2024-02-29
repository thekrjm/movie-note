'use client';
import './login.style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '@/commons/token';
import Cookie from 'js-cookie';
import Link from 'next/link';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const loginHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요.');
    }

    if (!password) {
      alert('비밀번호를 입력해주세요.');
    }

    const url = 'https://movie-note-api.keyworddiary.com/api/v1/auth/login';
    try {
      const { data } = await axios.post(url, {
        email,
        password,
      });

      // 받아온 accessToken을 globalState에 저장하기
      if (data.accessToken === undefined) {
        alert('로그인에 실패했습니다.');
        return;
      }
      setAccessToken(data?.accessToken);

      // 로그인 성공 페이지로 이동
      if (data && data.accessToken) {
        Cookie.set('accessToken', data.accessToken, { expires: 6 });
        router.push('/');
      }
      console.log('로그인 리스폰', data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <section className='container'>
      <span className='title'>MOVIE NOTE LOGIN</span>
      <div className='login-box'>
        <form onSubmit={loginHandleSubmit}>
          <div>
            <label>EMAIL</label>
            <input
              type='text'
              id='email'
              value={email}
              required
              onChange={onChangeEmail}
            />
          </div>
          <div>
            <label>PASSWORD</label>
            <input
              type='password'
              id='password'
              value={password}
              required
              onChange={onChangePassword}
            />
          </div>
          <button className='submit-btn' type='submit'>
            LOGIN
          </button>
        </form>
        <div className='registerLink-box'>
          <span>아직 회원이 아니신가요?</span>
          <Link href='/auth/register' className='registerLink'>
            가입하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
