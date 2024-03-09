'use client'

import "./ReplyReadPage.styles.css"
import { deleteReplyApi, getRepliesApi } from '@/app/api/movie-note-api'
import { getTimeComponent } from "@/lib/utils"
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie"

interface IRepluReadPageProps{
  reviewId:number
}

const ReplyReadPage = ({reviewId}:IRepluReadPageProps) => {

  const [replyList, setReplyList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRepliesApi(reviewId)
        setReplyList(data.list)
      } catch (error) {
        console.log("에러 발생", error);
      }
    }
    fetchData()
  },[reviewId])

  const token = Cookies.get('accessToken')
  if (token === undefined) return;

  const deleteReplyHandler = async (replyId:number) => {
    try {
      await deleteReplyApi(reviewId, replyId, token)
      const { data } = await getRepliesApi(reviewId)
      setReplyList(data.list)
    } catch(error) {
      console.log("삭제 에러 발생", error);
    }
    
  }

  return (
    <section className='reply-read-container'>
      <div>
        {replyList.map((reply: any) => (
          <div key={reply.id} className='reply-wrapper'>
            <div className="profile-box">
              <img src='/profile.png' alt='프로필 사진' className='reply-profile-img' />
              <div className="reply-nickname">{reply.member.nickname}</div>
            </div>
            <div className="reply-content">{reply.content}</div>
            <div className="reply-write-time">{getTimeComponent(reply.createdDateTime)} </div>
            <div className="delete-btn-wrapper">
              <button className="delete-btn" onClick={()=>deleteReplyHandler(reply.id)} >삭제</button>
            </div>
        </div>
        ))}
      </div>
    </section>
  )
}

export default ReplyReadPage