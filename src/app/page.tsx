import styles from '@/containers/review/Reviews.module.css'
import Reviews from '@/containers/review/Reviews'
import ReviewsMore from '@/containers/review/ReviewsMore'
import SortedList from '@/components/SortedList'
import { getMovieReviewApi } from '../api/route'
import { IHomeProps } from '@/types/types'

export default async function Home({ searchParams }: IHomeProps) {
  const { size, query, sort, page } = searchParams
  const { data } = await getMovieReviewApi(page, size, query, sort)

  return (
    <main>
      <section className={styles.listContainer}>
        <span className={styles.movieReviewTitle}>영화 리뷰 목록</span>
        <SortedList query={query} size={size} />
        <div className={styles.contentsWrapper}>
          <Reviews reviews={data.list} />
        </div>
        <ReviewsMore pageInfoProps={data.pageInfo} />
      </section>
    </main>
  )
}
