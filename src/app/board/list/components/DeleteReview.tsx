'use client'

import React from 'react'
import { deleteReviewApi } from '../../../api/movie-note-api'
import { useRouter } from 'next/navigation'

interface moviewReviewProps{
  movieReviewId: number
  token: string | undefined;
}

const DeleteReview = ({movieReviewId,token}:moviewReviewProps) => {
  const router = useRouter()
  const deleteReviewId = movieReviewId;
    
  const onClickDeleteRieview = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const confirmed = window.confirm("삭제하시겠습니까?") 
    try {
      if (confirmed) {
        await deleteReviewApi(deleteReviewId, token!!);
        router.replace('/')
      }
    } catch (error) {
      console.log("error occured", error);
    }
  }
  
  return (
    <div>
      <button style={{textAlign:'right', marginBottom: '10px'}} onClick={onClickDeleteRieview}>삭제하기</button>
    </div>
  )
}

export default DeleteReview