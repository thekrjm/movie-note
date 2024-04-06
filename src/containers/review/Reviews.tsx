import styles from './Reviews.module.css'
import { dateFormat } from '@/utils/date'
import Link from 'next/link'
import { IReviews } from './review.type'

export default function Reviews({ reviews }: { reviews: IReviews[] }) {
  return (
    <>
      {reviews.map((value: IReviews) => (
        <div key={value.id} className={styles.contentsItems}>
          <div className={styles.listRow}>
            <div className={styles.posterWrapper}>
              <Link href={`movie-review/${value.id}`}>
                <img
                  src={
                    value.uploadFileList[0]?.url
                      ? value.uploadFileList[0]?.url
                      : '/no-image.png'
                  }
                  className={styles.posterImg}
                />
              </Link>
            </div>
            <div className={styles.listItems}>
              <div className={styles.listTitle}>
                <Link href={`movie-review/${value.id}`}>{value?.title}</Link>
              </div>
              <div className={styles.listBasic}>{value?.member.nickname}</div>
              <div className={styles.listBasic}>
                {dateFormat(value?.createdDateTime)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
