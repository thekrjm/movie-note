'use client'
import './ReplyWritePage.styles.css'
import { getCookie } from '@/app/util/CookieUtils'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { createReplyApi } from '../api/movie-note-api'

const ReplyWritePage = (data: any) => {
  const [content, setContent] = useState('');

  const onChangeContent = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const replyWriteSubmit = async (event:FormEvent) => { 
    event.preventDefault();

    const token = getCookie('accessToken');
    if (token===undefined) {
      return;
    }
    const response = await createReplyApi(data.reviewId, {content}, token);
    console.log("댓글 입력", response);
    setContent("")

  }
  return (
    <section className='reply-container'>
      <span>댓글</span>
      <form onSubmit={replyWriteSubmit} className='form-wrapper' >
        <div className='content-box'>
          <textarea className='content-input' onChange={onChangeContent} />
        </div>
        <div className='btn-box'>
        <button type='submit' className='submit-btn'>입력</button>
        </div>
      </form>
    </section>
  )
}

export default ReplyWritePage