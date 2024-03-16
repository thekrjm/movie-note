'use client';
import './SearchList.styles.css'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

type Direction = 'DESC' | 'ASC'

const SearchList = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter()
  const submitSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/?query=${keyword}`)
    setKeyword('')
  }
  
  // const reOrderByCreatedDateTime = (direction: Direction) => {
  //   router.push(`/?query=${keyword}&sort=createdDateTime,${direction}`)
  // }

  const onChangeKeywordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  return (
    <section className='search-container'>
      <form onSubmit={submitSearch} className='search-form'>
        <div className='search-box'>
          <input
            type='text'
            value={keyword}
            onChange={onChangeKeywordHandler}
            className='search-input'
            placeholder='검색어를 입력해주세요.'
          />
          <button className='search-btn' type='submit'>
            <img src='/search.png' className='search-img' />
          </button>
        </div>
      </form>
{/* 
      <button onClick={() => reOrderByCreatedDateTime('ASC')}>오래된순</button>
      <button onClick={() => reOrderByCreatedDateTime('DESC')}>최신순</button> */}
    </section>
  );
};

export default SearchList;
