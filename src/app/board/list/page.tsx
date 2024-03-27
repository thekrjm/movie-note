import './reviewList.styles.css';
import { getMovieReviewApi} from '@/app/api/movie-note-api';
import SortedList from '@/app/components/SortedList';
import { getDateComponent } from '@/lib/utils';
import Link from 'next/link';

const ReviewList = async ({
  pageSize,
  query,
  sort,
}: {
  pageSize: number;
    query?: string;
    sort?: string;
  }) => {
  const {data} = await getMovieReviewApi(pageSize, query, sort);
  
    // console.log(data);
    

  return (
    <section className='list-container'>
      <span className='movieReview-title'>영화 리뷰 목록</span>
      <SortedList query={query} pageSize={pageSize} />
        <div className='contents-wrapper' >
          {data.list.map((value: any) => (
          <div key={value.id} className='contents-items'>             
            <div className='list-row '>
              <div className='poster-wrapper '>
                <Link href={`board/list/${value.id}`}>
                  <img src={value.uploadFileList[0]?.url} className='poster-img' />
                </Link>
              </div>
              <div className='list-items'>
                <div className='list-title '>
                  <Link href={`board/list/${value.id}`}>{value?.title}</Link>
                </div> 
                <div className='list-basic '>{value?.member.nickname}</div>
                <div className='list-basic '>
                  {getDateComponent(value?.createdDateTime)}
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        {data.pageInfo.last === true ? (
          <div className='more-page-box'></div>
          ) : (
          <div className='more-page-box'>
            <Link className='pageSize-text' href={`?&size=${+pageSize + 10}`}>
              <span className='morePage-btn'>더보기</span>
              <img className='arrow-down' src='/arrow-down.png' />
            </Link>
          </div>
        )}
    </section>
  );
};

export default ReviewList;
