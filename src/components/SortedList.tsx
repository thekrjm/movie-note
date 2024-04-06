'use client'

import styles from './SortedList.module.css'
import { Direction, ISortedListProps } from '@/types/types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SortedList = ({ query = '', size }: ISortedListProps) => {
  const router = useRouter()
  const [selectedButton, setSelectedButton] = useState('')

  const onClickCreatedDate = (direction: Direction) => {
    router.push(
      `/?query=${query}&size=${size}&sort=createdDateTime,${direction}`,
    )
    if (direction === 'DESC') {
      setSelectedButton('createdDateTime,DESC')
    } else {
      setSelectedButton('createdDateTime,ASC')
    }
  }

  const onClickReplyStatistics = (direction: Direction) => {
    router.push(
      `/?query=${query}&size=${size}&sort=statistics.replyTotal,${direction}`,
    )
    setSelectedButton('statistics.replyTotal')
  }

  const onClickLikeStatistics = (direction: Direction) => {
    router.push(
      `/?query=${query}&size=${size}&sort=statistics.likeTotal,${direction}`,
    )
    setSelectedButton('statistics.likeTotal')
  }

  return (
    <div className={styles.container}>
      <button
        className={`${styles.sortButton} ${selectedButton === 'createdDateTime,DESC' ? styles.selected : ''}`}
        onClick={() => onClickCreatedDate('DESC')}
      >
        최신 순
      </button>
      <button
        className={`${styles.sortButton} ${selectedButton === 'createdDateTime,ASC' ? styles.selected : ''}`}
        onClick={() => onClickCreatedDate('ASC')}
      >
        오래된 순
      </button>
      <button
        className={`${styles.sortButton} ${selectedButton === 'statistics.replyTotal' ? styles.selected : ''}`}
        onClick={() => onClickReplyStatistics('DESC')}
      >
        댓글 많은 순
      </button>
      <button
        className={`${styles.sortButton} ${selectedButton === 'statistics.likeTotal' ? styles.selected : ''}`}
        onClick={() => onClickLikeStatistics('DESC')}
      >
        좋아요 많은 순
      </button>
    </div>
  )
}

export default SortedList
