'use client'

import React, { useState } from 'react'

interface IGerMorePageProps{
  currentPageValue: number;
  totalPages: number;
}

// 1. 더보기 버튼 만들기
// 2. 전체페이지보다 현재페이지 숫자가 낮으면 더보기 누를 때 current숫자 증가
// 3. 증가된 페이지가 보이게 구현

const GetMorePage = ({currentPageValue, totalPages}:IGerMorePageProps) => {

  const [currentPage, setCurrentPage] = useState(currentPageValue);

  const onClickMorePageHandle = () => {
    setCurrentPage(currentPage + 1);
  }
  

  return (
    <div>
      <button onClick={onClickMorePageHandle}>더보기</button>
    </div>
  )
}

export default GetMorePage