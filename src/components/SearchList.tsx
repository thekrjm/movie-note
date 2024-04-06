'use client'
import styles from './SearchList.module.css'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

const SearchList = () => {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const submitSearch = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (keyword.length == 0) return
    router.push(`/?query=${keyword}`)
    setKeyword('')
  }

  const onChangeKeywordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  return (
    <section className={styles.container}>
      <form onSubmit={submitSearch} className={styles.searchForm}>
        <div className={styles.searchBox}>
          <input
            type="text"
            value={keyword}
            onChange={onChangeKeywordHandler}
            className={styles.searchInput}
            placeholder="검색어를 입력해주세요."
          />
          <button className={styles.searchButton} type="submit">
            <img src="/search.png" className={styles.searchImg} />
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchList
