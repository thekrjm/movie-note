'use client';

import { accessTokenState } from '@/commons/token';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Home() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  console.log(accessToken);

  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://movie-note-api.keyworddiary.com/api/v1/movie-reviews',
      );
      console.log('첫 데이터', response);
      setMovieData(response.data.list);
    };
    fetchData();
  }, []);

  console.log('moviedata', movieData);

  return (
    <main>
      <div>
        {movieData.map((item) => (
          <>
            <div>{item.title}</div>
          </>
        ))}
      </div>
    </main>
  );
}
