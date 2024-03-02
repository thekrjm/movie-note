import './boardRead.styles.css'
import { getPost } from '@/app/api/movie-note-api'
import  {getDate}  from '@/lib/utils';
import Link from 'next/link';


const BoardRead = async () => {
  // const router = useRouter()

    const { data } = await getPost();
    // console.log("겟포스트", data.list);


    // const onClickMoveToDetail = (event:MouseEvent<HTMLDivElement>) => {
    //   router.push(`/pages/boardRead/${event.currentTarget.id}`)
    // }

    return (
      <section>
        <div className='container'>
          <div className='list-row'>
            <div className='list-basic'>글번호</div>
            <div className='list-title'>제목</div>
            <div className='list-basic'>작성자</div>
            <div className='list-basic'>작성일자</div>
          </div>
          {data.list.map((value: any, index: number) => (
            <div key={value.member.id}>
              <div className='list-row'>
                <div className='list-basic'>{index+1}</div>
                <div className='list-title' id={value.member.id} >
                  <Link href={`board/read/${value.member.id}`}>{value?.title}</Link>
                </div>
                <div className='list-basic'>{value?.member.nickname}</div>
                <div className='list-basic'>{getDate(value?.createdDateTime)}</div>
              </div>
           </div>
            ))}
        </div>
      </section>
    )
  }

  export default BoardRead