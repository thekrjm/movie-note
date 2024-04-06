'use client'
import styles from './ReplyWritePage.module.css'
import { getCookie } from '@/utils/cookie'
import { ChangeEvent, FormEvent, useState } from 'react'
import { createReplyApi } from '../../api/route'
import { IReplyWrite } from './Reply.type'

const ReplyWritePage = ({ reviewId }: IReplyWrite) => {
  const [content, setContent] = useState('')

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }
  const token = getCookie('accessToken')

  const replyWriteSubmit = async () => {
    if (token) {
      await createReplyApi(reviewId, { content }, token)
      setContent('')
    } else {
      alert('로그인 후 댓글 작성 가능합니다.')
    }
  }
  return (
    <section className={styles.container}>
      <span>댓글</span>
      <form onSubmit={replyWriteSubmit} className={styles.formWrap}>
        <div>
          <textarea
            className={styles.contentInput}
            onChange={onChangeContent}
            required
          />
        </div>
        <div className={styles.buttonWrap}>
          <button type="submit" className={styles.submitButton}>
            입력
          </button>
        </div>
      </form>
    </section>
  )
}

export default ReplyWritePage
