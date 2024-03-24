'use client';

import React, { useEffect, useState } from 'react';
import { getCookie } from '../util/CookieUtils';
import { getUserDataApi } from '../api/movie-note-api';

interface IUserInfo{
  nickname: string
  email: string
}

const myPage = () => {
  const [myPageInfo, setMyPageInfo] = useState<IUserInfo | null>(null);
  const token = getCookie('accessToken');
  if (token === undefined) return null;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getUserDataApi(token);
      setMyPageInfo(data);
    };
    fetchData();
  }, []);
  
  return (
    <section>
      <div>닉네임:{myPageInfo?.nickname}</div>
      <div>Email: {myPageInfo?.email}</div>
    </section>
  );
};

export default myPage;
