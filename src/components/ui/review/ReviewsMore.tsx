'use client'

import { useEffect, useState } from 'react'
import Reviews from './Reviews'
import { getMovieReviewApi } from '@/app/api/movie-note-api'
import { IPageInfo } from '@/type/types'

export default function ReviewsMore({
  query,
  sort,
  pageInfoProps,
}: {
  query?: string
  sort?: string
  pageInfoProps: IPageInfo
}) {
  const [reviews, setReviews] = useState<any>([])
  const [page, setPage] = useState<number | null>(null)
  const [pageInfo, setPageInfo] = useState<IPageInfo>(pageInfoProps)

  useEffect(() => {
    if (!page) {
      return
    }

    getMovieReviewApi(page, 10, query, sort).then(({ data }) => {
      setPageInfo(data.pageInfo)
      setReviews((prev: any[]) => {
        return [...prev, ...data.list]
      })
    })
  }, [page, query, sort])

  const fetchMore = () => {
    if (page === null) {
      setPage(1)
    } else {
      setPage((prev) => prev!! + 1)
    }
  }

  return (
    <>
      <div className="contents-wrapper">
        <Reviews reviews={reviews} />
      </div>
      {!pageInfo.last ? (
        <div className="more-page-box">
          <button className="pageSize-text" onClick={() => fetchMore()}>
            <span className="morePage-btn">더보기</span>
            <img className="arrow-down" src="/arrow-down.png" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
