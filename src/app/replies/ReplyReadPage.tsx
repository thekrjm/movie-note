'use client'

import './ReplyReadPage.styles.css'
import { getRepliesApi, updateReplyApi } from '@/app/api/movie-note-api'
import { dateFormatWithTimes } from '@/lib/utils'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import ReplyDeleteButton from './ReplyDeleteButton'
import ReplyUpdateButton from './ReplyUpdateButton'
import { IReplyListType } from './replyTypes'

const ReplyReadPage = ({ reviewId }: { reviewId: number }) => {
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

  const fetchData = async () => {
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
    fetchData()
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
    <section className="reply-read-container">
      <div>
        {replyList.map((reply: IReplyListType, replyIndex: number) => (
          <div key={reply.id} className="reply-wrapper">
            <div className="profile-box">
              <img
                src="/profile.png"
                alt="프로필 사진"
                className="reply-profile-img"
              />
              <div className="reply-nickname">{reply.member.nickname}</div>
            </div>
            {updateReplyId === reply.id ? (
              <div className="update-content-box">
                <input
                  className="updateContent-input"
                  type="text"
                  value={updateContent}
                  onChange={onChangeUpdataContentInput}
                />
                <button
                  className="updateContent-button"
                  onClick={updateReplySubmitHandler}
                >
                  수정
                </button>
              </div>
            ) : (
              <div className="reply-content">{reply.content}</div>
            )}
            <div className="reply-write-time">
              {dateFormatWithTimes(reply.createdDateTime)}{' '}
            </div>
            <div className="replyUpdateDelete-btns">
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
