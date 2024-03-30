'use client'
import './ReplyWritePage.styles.css'
import { getCookie } from '@/app/util/CookieUtils'
import { ChangeEvent, FormEvent, useState } from 'react'
import { createReplyApi } from '../api/movie-note-api'

const ReplyWritePage = ({reviewId}:{reviewId:number}) => {
  const [content, setContent] = useState('');

  const onChangeContent = (event:ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }
  const token = getCookie('accessToken');  

  const replyWriteSubmit = async () => { 
    if (token) {
      await createReplyApi(reviewId, {content}, token);
      setContent("")
    } else {
      alert("로그인 후 댓글 작성 가능합니다.")
    }
  }
  return (
    <section className='reply-container'>
      <span>댓글</span>
      <form onSubmit={replyWriteSubmit} className='form-wrapper' >
        <div className='content-box'>
          <textarea className='content-input' onChange={onChangeContent} required />
        </div>
        <div className='btn-box'>
        <button type='submit' className='submit-btn'>입력</button>
        </div>
      </form>
    </section>
  )
}

export default ReplyWritePage