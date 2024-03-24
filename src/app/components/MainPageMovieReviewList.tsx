'use client'

import { getDateComponent } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react'
import { getMovieReviewApi } from '../api/movie-note-api';



const MainPageMovieReviewList = ({movieReviewData}:any) => {
  
  
  const [reviewList, setReviewList] = useState([...movieReviewData.list])
  const [size, setSize] = useState(20);


  const onClickMorePage = async () => {
    try {
      const { data } = await getMovieReviewApi(size);
      setReviewList([...data.list])
      setSize((prevSize)=>prevSize+10);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='list-wrapper'>
        <div className='contents-wrapper' >
          {reviewList.map((value:any) => (
          <div key={value.id} className='contents-items'>             
            <div className='list-row '>
              <div className='poster-wrapper '>
                <Link href={`board/list/${value.id}`}>
                  <img src={value.uploadFileList[0]?.url} className='poster-img' />
                </Link>
              </div>
              <div className='list-items'>
                <div className='list-title '>
                  <Link href={`board/list/${value.id}`}>{value?.title}</Link>
                  </div> 
                <div className='list-basic '>{value?.member.nickname}</div>
                <div className='list-basic '>
                  {getDateComponent(value?.createdDateTime)}
                </div>
              </div>
            </div>
          </div>
          ))}
          <div className='moreAddPage' onClick={onClickMorePage}>
          더보기
        </div>
        </div>
        </div>
  )
}

export default MainPageMovieReviewList