'use client'

import React from 'react'
import { deleteReviewApi } from '../api/movie-note-api'
import { getCookie } from '../util/CookieUtils'
import { useRouter } from 'next/navigation'

interface moviewReviewProps{
  movieReviewId:number
}

const DeleteReview = (movieReviewId:moviewReviewProps) => {
  const router = useRouter()
  const deleteReviewId = movieReviewId.movieReviewId


  const token = getCookie('accessToken');
  if (token === undefined) return;

  const onClickDeleteRieview = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    const confirmed = window.confirm("삭제하시겠습니까?") 
    try {
      if (confirmed) {
        await deleteReviewApi(deleteReviewId, token);
        // router.push('/')
        router.replace('/')
      }
    } catch (error) {
      console.log("error occured", error);
    }
  }
  
  return (
    <button onClick={onClickDeleteRieview}>삭제하기</button>
  )
}

export default DeleteReview