import MainPageMovieReviewList from '@/app/components/MainPageMovieReviewList';
import './boardRead.styles.css';
import { getMovieReviewApi} from '@/app/api/movie-note-api';
import SortedList from '@/app/components/SortedList';
import { getDateComponent } from '@/lib/utils';
import Link from 'next/link';

const BoardRead = async ({
  pageSize,
  query,
  sort,
}: {
  pageSize: number;
    query?: string;
    sort?: string;
  }) => {
  const {data} = await getMovieReviewApi(pageSize, query, sort);
  
    // console.log("readPageData", data.list);
    

  return (
    <section className='list-container'>
      <SortedList query={query} pageSize={pageSize} />
      {/* <MainPageMovieReviewList movieReviewData={data} /> */}
      <div className='list-wrapper'>
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
          <div className='moreAddPage'>
        {data.pageInfo.last === true ? (
          <></>
          ) : (
          <div className='pageSize-text'>
            <Link href={`?&size=${+pageSize + 10}`}>더보기</Link>
          </div>
        )}
        </div>
        </div>
        </div>
    </section>
  );
};

export default BoardRead;
