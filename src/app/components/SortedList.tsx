'use client'
import './SortedList.styles.css'
import { useRouter } from 'next/navigation'
import React from 'react';

interface ISortedListProps {
  query?: string
  pageSize: number;
}

type Direction=  'DESC' | 'ASC'

const SortedList = ({query="",pageSize}:ISortedListProps) => {
  const router = useRouter()

  
  
  const onClickCreatedDate = (direction:Direction) => {
    router.push(`/?query=${query}&size=${pageSize}&sort=createdDateTime,${direction}`)
  }

  const onClickReplyStatistics = (direction: Direction) => {
    router.push(`/?query=${query}&size=${pageSize}&sort=statistics.replyTotal,${direction}`)
  }

  const onClickLikeStatistics = (direction: Direction) => {
    router.push(`/?query=${query}&size=${pageSize}&sort=statistics.likeTotal,${direction}`)
  }

  return (
    <div className='sort-container'>
      <button className='sort-btn' onClick={() => onClickCreatedDate('DESC')}>최신 순</button>
      <button className='sort-btn' onClick={() => onClickCreatedDate('ASC')}>오래된 순</button>
      <button className='sort-btn' onClick={() => onClickReplyStatistics('DESC')}>댓글 많은 순</button>
      <button className='sort-btn' onClick={() => onClickLikeStatistics('DESC')}>좋아요 많은 순</button>
    </div>
  )
}

export default SortedList