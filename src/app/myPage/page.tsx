'use client';

import React, { useEffect, useState } from 'react';
import { getCookie } from '../util/CookieUtils';
import { userDataApi } from '../api/movie-note-api';

const maPage = () => {
  const [myPageInfo, setMyPageInfo] = useState(null);
  const token = getCookie('accessToken');
  if (token === undefined) return;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await userDataApi(token);
      setMyPageInfo(data);
      //   console.log('내정보', data);
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

export default maPage;
