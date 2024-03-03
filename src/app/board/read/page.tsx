import './boardRead.styles.css'
import { getPost } from '@/app/api/movie-note-api'
import  {getDateComponent}  from '@/lib/utils';
import Link from 'next/link';


const BoardRead = async () => {

    const { data } = await getPost();

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
                <div className='list-title' >
                  <Link href={`board/read/${value.id}`}>{value?.title}</Link>
                </div>
                <div className='list-basic'>{value?.member.nickname}</div>
                <div className='list-basic'>{getDateComponent(value?.createdDateTime)}</div>
              </div>
           </div>
            ))}
        </div>
      </section>
    )
  }

  export default BoardRead