'use client';
import './Mypage.styles.css'
import React, { useEffect, useState } from 'react';
import { getCookie } from '../util/CookieUtils';
import { getUserDataApi } from '../api/movie-note-api';

interface IUserInfo{
  nickname: string
  email: string
}

const MyPage = () => {
  const [myPageInfo, setMyPageInfo] = useState<IUserInfo | null>(null);
  const token = getCookie('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      if(token){
        const { data } = await getUserDataApi(token);
        setMyPageInfo(data);
      }
    };
    fetchData();
  }, []);
  
  return (
    <section className='mypage-container'>
      <div className='mapage-info'>
      <img className='profile-img' src='/profile.png' />
      <div>
      <div className='mypage-nickname'>닉네임:{myPageInfo?.nickname}</div>
      <div className='mypage-email'>Email: {myPageInfo?.email}</div>
      </div>
      </div>
    </section>
  );
};

export default MyPage;
