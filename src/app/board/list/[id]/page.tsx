import './detailPage.styles.css';
import { getPostId } from '@/app/api/movie-note-api';
import LikeButtonToggle from '@/app/components/LikeButtonToggle';
import StatisticsInfo from '@/app/components/StatisticsInfo';
import { getTimeComponent } from '@/lib/utils';
import ReplyReadPage from '@/app/replies/ReplyReadPage';
import ReplyWritePage from '@/app/replies/ReplyWritePage';
import { cookies } from 'next/headers';
import DeleteReview from '@/app/components/DeleteReview';

const DetailPage = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { size: number; query: string };
}) => {
  const { size, query } = searchParams;
  if (params?.id == undefined) {
    return;
  }

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  // param valid check
  if (
    params.id == undefined ||
    Array.isArray(params.id) ||
    token === undefined
  ) {
    return;
  }
  
  const getReviewRes = await getPostId(params.id, token);
  let { data } = getReviewRes;

  console.log("dataaaaa",data);
  
  return (
    <section className='container'>
      <div className='title-wrapper'>
        <span className='title-desc'>영화에 대한 나의 생각은</span>
        <div className='title'>{data.title}</div>
        <DeleteReview movieReviewId ={data.id} />
      </div>
      <div className='profile-wrapper'>
        <div className='profile-content'>
          <img src='/profile.png' alt='프로필 사진' className='profile-img' />
          <div className='profile-name'>{data.member.nickname}</div>
        </div>
        <div className='date-wrapper'>
          {getTimeComponent(data.createdDateTime)}
        </div>
      </div>
      <div className='content-wrapper'>{data.content}</div>
      {data?.uploadFileList[0]?.url ? 
      <img src={data?.uploadFileList[0]?.url} />
        :
        <></>
    }
      <div className='like-wrapper'>
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
  );
};

export default DetailPage;