'use client';

import './ReplyReadPage.styles.css';
import { deleteReplyApi, getRepliesApi } from '@/app/api/movie-note-api';
import { getTimeComponent } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface IReplyReadPageProps {
  reviewId: number;
}

type IReplyListType={
  content: string
  createdDateTime:string
  id: number
  member: {
    email: string
    id: number
    nickname: string
  }
  updatedDateTime:string
}

const ReplyReadPage = ({ reviewId }: IReplyReadPageProps) => {
  const [replyList, setReplyList] = useState<IReplyListType[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [hasMorePage, setHasMorePage] = useState(true);
  const [page, setPage] = useState(0)


  const fetchData = async () => {
      if (isLoading) return;
      setIsLoading(true)
      try {
        const { data } = await getRepliesApi(reviewId,page);
        if (data.list.length < 10) {
          setHasMorePage(false)
        }
        setReplyList((prevList)=>[...prevList, ...data.list]);
        setPage((prevPage) => prevPage + 1)        
      } catch (error) {
          console.log('댓글 로딩 에러 발생', error);
      } finally {
        setIsLoading(false)
      }
      
  };
  

  useEffect(() => {
    const handleScroll = () => {
      const isScrollEnded =  window.innerHeight + window.scrollY  >= document.body.offsetHeight
      if (isScrollEnded && hasMorePage && !isLoading) {
        fetchData()
      }
    }
    window.addEventListener('scroll', handleScroll);
    return ()=> window.removeEventListener('scroll', handleScroll)
  },[isLoading])

  
  const token = Cookies.get('accessToken');

  const deleteReplyHandler = async (replyId: number) => {
    try {
      await deleteReplyApi(reviewId, replyId, token!!);
      const { data } = await getRepliesApi(reviewId,page);
      setReplyList(data.list);
    } catch (error) {
      console.log('삭제 에러 발생', error);
    }
  };

  return (
    <section className='reply-read-container'>
      <div>
        {replyList.map((reply: any) => (
          <div key={reply.id} className='reply-wrapper'>
            <div className='profile-box'>
              <img
                src='/profile.png'
                alt='프로필 사진'
                className='reply-profile-img'
              />
              <div className='reply-nickname'>{reply.member.nickname}</div>
            </div>
            <div className='reply-content'>{reply.content}</div>
            <div className='reply-write-time'>
              {getTimeComponent(reply.createdDateTime)}{' '}
            </div>
            <div className='delete-btn-wrapper'>
              <button
                className='delete-btn'
                onClick={() => deleteReplyHandler(reply.id)}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReplyReadPage;
