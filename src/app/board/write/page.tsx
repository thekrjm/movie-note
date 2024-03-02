'use client'
import { createPost } from '@/app/api/movie-note-api'
import './boardWrite.styles.css'
import { getCookie } from '@/app/util/CookieUtils'
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'

const boardWrite = () => {

  const [title, setTitle] = useState('')
  const [content, setContents] = useState('')

  const token = getCookie('accessToken')
  const headers = {
    'Authorization':`Bearer ${token}`
  }

  const postData = {
    title, content
  }

  console.log("토큰",token);
  

  const boardWriteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // const url = 'https://movie-note-api.keyworddiary.com//api/v1/session-member/movie-reviews'
    // const response = await axios.post(url, postData, {
    //   headers:headers
    // })

    const response = await createPost(postData, token!!)
    console.log("작성 게시물", response);
  }

  const onChangeTitle = (event:ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }

  return (
    <section className='container'>
      <form className='write-box' onSubmit={boardWriteSubmit}>
        <div className='title-box'>
          <input
              className='input-title'
              type='text'
              id='title'
              value={title}
              required
              onChange={onChangeTitle}
              placeholder='제목을 입력해주세요.'
          />
        </div>
      <div>  
      <div className='contents-box'>
          <textarea
            className='textarea-contents'
            id='contents'
            value={content}
            required
            onChange={onChangeContents}
            placeholder='감상평을 작성해보세요.'
        />
          </div>
          <div className='btn-wrap'>
            <button className='submit-btn' type='submit'>
              저장하기
            </button>
          </div>
      </div>
      </form>
    </section>
  )
}

export default boardWrite