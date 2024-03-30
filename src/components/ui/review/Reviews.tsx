import { dateFormat } from '@/lib/utils'
import Link from 'next/link'
import './Reviews.styles.css'

export default function Reviews({ reviews }: { reviews: any[] }) {
  return (
    <>
      {reviews.map((value: any) => (
        <div key={value.id} className="contents-items">
          <div className="list-row ">
            <div className="poster-wrapper ">
              <Link href={`board/list/${value.id}`}>
                <img
                  src={value.uploadFileList[0]?.url}
                  className="poster-img"
                />
              </Link>
            </div>
            <div className="list-items">
              <div className="list-title ">
                <Link href={`board/list/${value.id}`}>{value?.title}</Link>
              </div>
              <div className="list-basic ">{value?.member.nickname}</div>
              <div className="list-basic ">
                {dateFormat(value?.createdDateTime)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
