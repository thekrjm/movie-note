'use client';
import { getPost } from '@/app/api/movie-note-api';
import React, { useEffect, useState } from 'react';

const SearchList = ({
  pageSize,
  query,
}: {
  pageSize: number;
  query: string;
}) => {
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getPost(pageSize, query);
      // console.log('검색페이지 데이터', data.list);
      setSearchList(data.list);
    };
    fetchData();
  }, []);
  // console.log('검색결과', searchList[0].title);

  const result = searchList.filter((value) => value.title.includes(keyword));
  // console.log('result', result);
  return (
    <div>
      검색창
      <form>
        <input
          style={{ backgroundColor: 'red' }}
          type='text'
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchList;
