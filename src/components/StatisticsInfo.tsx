'use client'
import styles from './StatisticsInfo.module.css'
import React, { useEffect, useState } from 'react'
import { reviewStatisticsApi, viewTotalApi } from '../api/route'
import { getCookie } from '../utils/cookie'

const StatisticsInfo = ({ reviewId }: { reviewId: number }) => {
  const [replyStatistics, setReplyStatistics] = useState(0)
  const [likeStatistics, setLikeStatistics] = useState(0)
  const [viewStatistics, setViewStatistics] = useState(0)

  const token = getCookie('accessToken')

  if (likeStatistics < 0) likeStatistics === 0

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const { data } = await reviewStatisticsApi(reviewId, token)
        const viewCount = await viewTotalApi(reviewId)
        setReplyStatistics(data.replyTotal)
        if (data.likeTotal < 0) {
          setLikeStatistics(0)
        } else {
          setLikeStatistics(data.likeTotal)
        }
        setViewStatistics(data.viewsTotal)
      }
    }
    fetchData()
  }, [reviewId])
  return (
    <div className={styles.container}>
      <span className={styles.statisticsItem}>댓글 수:{replyStatistics}</span>
      <span className={styles.statisticsItem}>추천 수:{likeStatistics}</span>
      <span className={styles.statisticsItem}>조회 수:{viewStatistics}</span>
    </div>
  )
}

export default StatisticsInfo
