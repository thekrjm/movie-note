'use client'
import styles from './Reviews.module.css'
import { useEffect, useState } from 'react'
import Reviews from './Reviews'
import { getMovieReviewApi } from '@/api/route'
import { IPageInfo, IReviewMore } from './review.type'

export default function ReviewsMore({
  query,
  sort,
  pageInfoProps,
}: IReviewMore) {
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
      <div className={styles.contentsWrapper}>
        <Reviews reviews={reviews} />
      </div>
      {!pageInfo.last ? (
        <div className={styles.morePageBox}>
          <button className={styles.pageSizeText} onClick={() => fetchMore()}>
            <span className={styles.morePageButton}>더보기</span>
            <img className={styles.arrowDown} src="/arrow-down.png" />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
