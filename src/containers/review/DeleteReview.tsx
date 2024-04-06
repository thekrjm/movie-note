'use client'

import React from 'react'
import { deleteReviewApi } from '../../api/route'
import { useRouter } from 'next/navigation'
import { moviewReview } from './review.type'

const DeleteReview = ({ movieReviewId, token }: moviewReview) => {
  const router = useRouter()
  const deleteReviewId = movieReviewId

  const onClickDeleteRieview = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    const confirmed = window.confirm('삭제하시겠습니까?')
    try {
      if (confirmed) {
        await deleteReviewApi(deleteReviewId, token!!)
        router.replace('/')
      }
    } catch (error) {
      console.log('error occured', error)
    }
  }

  return (
    <div>
      <button
        style={{ textAlign: 'right', marginBottom: '10px' }}
        onClick={onClickDeleteRieview}
      >
        삭제하기
      </button>
    </div>
  )
}

export default DeleteReview
