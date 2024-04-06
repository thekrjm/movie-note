'use client'

import styles from './ReplyReadPage.module.css'
import { getRepliesApi, updateReplyApi } from '@/api/route'
import { dateFormatWithTimes } from '@/utils/date'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import ReplyDeleteButton from './ReplyDeleteButton'
import ReplyUpdateButton from './ReplyUpdateButton'
import { IReplyListType, IReplyReadPage } from './Reply.type'

const ReplyReadPage = ({ reviewId }: IReplyReadPage) => {
  const [replyList, setReplyList] = useState<IReplyListType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMorePage, setHasMorePage] = useState(true)
  const [page, setPage] = useState(0)
  const [updateReplyId, setUpdateReplyId] = useState<number | null>(null)
  const [updateContent, setUpdateContent] = useState('')
  const token = Cookies.get('accessToken')

  let abortController: AbortController

  useEffect(() => {
    return () => {
      if (abortController !== null) {
        abortController?.abort()
      }
    }
  }, [])

  const replyFetchData = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      abortController = new AbortController()
      const { data } = await getRepliesApi(reviewId, page, {
        signal: abortController.signal,
      })
      setHasMorePage(!data.pageInfo.last)
      setUpdateReplyId(data.list.id)
      setReplyList((prevList) => {
        return [...prevList, ...data.list]
      })
    } catch (error) {
      console.log('댓글 로딩 에러 발생', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    replyFetchData()
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      const isScrollEnded =
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      if (isScrollEnded && hasMorePage && !isLoading) {
        setPage((prevPage) => prevPage + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  const onChangeUpdataContentInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateContent(event.target.value)
  }

  const updateReplySubmitHandler = async () => {
    try {
      await updateReplyApi(reviewId, updateReplyId!!, updateContent, token!!)
      const { data } = await getRepliesApi(reviewId, page)
      setReplyList(data.list)
      setUpdateContent('')
      setUpdateReplyId(null)
    } catch (error) {
      console.log('replyUpdateError', error)
    }
  }

  return (
    <section className={styles.container}>
      <div>
        {replyList.map((reply: IReplyListType, replyIndex: number) => (
          <div key={reply.id} className={styles.replyWrap}>
            <div className={styles.profileBox}>
              <img
                src="/profile.png"
                alt="프로필 사진"
                className={styles.profileImg}
              />
              <div className={styles.nickname}>{reply.member.nickname}</div>
            </div>
            {updateReplyId === reply.id ? (
              <div className={styles.updateContentBox}>
                <input
                  className={styles.updateContentInput}
                  type="text"
                  value={updateContent}
                  onChange={onChangeUpdataContentInput}
                />
                <button
                  className={styles.updateContentButton}
                  onClick={updateReplySubmitHandler}
                >
                  수정
                </button>
              </div>
            ) : (
              <div className={styles.content}>{reply.content}</div>
            )}
            <div className={styles.writeTime}>
              {dateFormatWithTimes(reply.createdDateTime)}{' '}
            </div>
            <div className={styles.replyUpdateDeleteButton}>
              <ReplyUpdateButton
                replyId={reply.id}
                replyContent={reply.content}
                setUpdateReplyId={setUpdateReplyId}
                setUpdateContent={setUpdateContent}
              />
              <ReplyDeleteButton
                replyIndex={replyIndex}
                reviewId={reviewId}
                replyId={reply.id}
                token={token}
                setReplyList={setReplyList}
              />
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReplyReadPage
