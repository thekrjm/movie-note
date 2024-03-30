'use client';
import './SearchList.styles.css'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';

const SearchList = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter()

  const submitSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword.length == 0) return;
    router.push(`/?query=${keyword}`)
    setKeyword('')
  }

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
    </section>
  );
};

export default SearchList;
