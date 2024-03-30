import Reviews from '@/components/ui/review/Reviews'
import { getMovieReviewApi } from './api/movie-note-api'
import ReviewsMore from '@/components/ui/review/ReviewsMore'

export default async function Home({
  searchParams,
}: {
  searchParams: { size: number; query: string; sort: string; page: number }
}) {
  const { size, query, sort, page } = searchParams
  const { data } = await getMovieReviewApi(page, size, query, sort)

  return (
    <main style={{ height: '100%' }}>
      <section className="list-container">
        <span className="movieReview-title">영화 리뷰 목록</span>
        <div className="contents-wrapper">
          <Reviews reviews={data.list} />
        </div>
        <ReviewsMore />
      </section>
    </main>
  )
}
