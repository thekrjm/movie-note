import styles from './ReviewDetail.module.css'
import { getPostIdApi } from '@/api/route'
import { cookies } from 'next/headers'
import React from 'react'
import DeleteReview from '../review/DeleteReview'
import { dateFormatWithTimes } from '@/utils/date'
import LikeButtonToggle from '@/components/LikeButtonToggle'
import StatisticsInfo from '@/components/StatisticsInfo'
import ReplyWritePage from '../replies/ReplyWritePage'
import ReplyReadPage from '../replies/ReplyReadPage'
import { IReviewDetail } from './ReviewDetail.type'

const ReviewDetail = async ({ params }: IReviewDetail) => {
  const cookieStore = cookies()
  const token = cookieStore.get('accessToken')?.value

  const isNotValidParameter =
    isNaN(params.id) || !params.id || Array.isArray(params.id)
  if (isNotValidParameter) {
    return
  }

  const getReviewRes = await getPostIdApi(params.id, token || null)
  let { data } = getReviewRes

  return (
    <main>
      <section className={styles.container}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>{data.title}</div>
        </div>
        <div className={styles.profileWrap}>
          <div className={styles.profileBox}>
            <img
              src="/profile.png"
              alt="프로필 사진"
              className={styles.profileImg}
            />
            <div className={styles.profileName}>{data.member.nickname}</div>
          </div>
          <div className={styles.dateWrap}>
            <DeleteReview movieReviewId={data.id} token={token} />
            {dateFormatWithTimes(data.createdDateTime)}
          </div>
        </div>
        <div className={styles.contentImageBox}>
          <div className={styles.imageWrap}>
            <img
              className={styles.imagePoster}
              src={data?.uploadFileList[0]?.url}
            />
          </div>
          <div className={styles.contentsWrap}>{data.content}</div>
        </div>
        <div className={styles.likeWrap}>
          <LikeButtonToggle
            reviewId={data.id}
            likeIdValue={data.likeId}
            isLikeValue={data.isLike}
          />
          <StatisticsInfo reviewId={data.id} />
        </div>
        <ReplyWritePage reviewId={data.id} />
        <ReplyReadPage reviewId={data.id} />
      </section>
    </main>
  )
}

export default ReviewDetail
