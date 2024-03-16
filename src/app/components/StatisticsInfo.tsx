'use client'
import './StatisticsInfo.styles.css'
import React, { useEffect, useState } from 'react'
import { reviewStatistics } from '../api/movie-note-api';
import { getCookie } from '../util/CookieUtils';

const StatisticsInfo = ({ reviewId }: { reviewId: number }) => {

  const [replyStatistics, setReplyStatistics] = useState(0);
  const [likeStatistics, setLikeStatistics] = useState(0);
  const [viewStatistics, setViewStatistics] = useState(0);

  const token = getCookie('accessToken')
  if (token == undefined) return;

  if (likeStatistics < 0) likeStatistics === 0;

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await reviewStatistics(reviewId, token);
      setReplyStatistics(data.replyTotal);
      if (data.likeTotal < 0) {
        setLikeStatistics(0)
      } else {
        setLikeStatistics(data.likeTotal);
      }
      setViewStatistics(data.viewsTotal);
    }
    fetchData()
  },[reviewId])

  return (
    <div className='statistics-container'>
        <span className='statistics-item'>댓글 수:{replyStatistics}</span>
        <span className='statistics-item'>추천 수:{likeStatistics}</span>
        <span className='statistics-item'>조회 수:{viewStatistics}</span>
    </div>
  )
}

export default StatisticsInfo