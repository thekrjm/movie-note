import ReviewDetail from '@/containers/review-detail/ReviewDetail'

const DetailPage = ({ params }: { params: { id: number } }) => {
  return <ReviewDetail params={params} />
}

export default DetailPage
