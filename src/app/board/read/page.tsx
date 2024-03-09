import './boardRead.styles.css'
import { getPost } from '@/app/api/movie-note-api'
import  {getDateComponent}  from '@/lib/utils';
import Link from 'next/link';

const BoardItem = ({ value, index }: { value: any, index: number }) => {
  return (
    <div key={value.id}>
    <div className='list-row'>
      <div className='list-basic'>{index+1}</div>
      <div className='list-title' >
        <Link href={`board/read/${value.id}`}>{value?.title}</Link>
      </div>
      <div className='list-basic'>{value?.member.nickname}</div>
      <div className='list-basic'>{getDateComponent(value?.createdDateTime)}</div>
    </div>
 </div>
  )
}


const BoardRead = async ({ pageSize, query }: {pageSize: number, query?: string}) => {
  const { data } = await getPost(pageSize, query);
    // console.log(data);
    
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
            <div key={value.id}>
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
          <Link href={`?size=${+pageSize + 10}`}>
             더보기
          </Link>
        </div>
      </section>
    )
  }

export default BoardRead;