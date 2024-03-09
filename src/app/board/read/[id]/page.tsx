import './detailPage.styles.css';
import { getPostId, reviewStatistics } from '@/app/api/movie-note-api';
import LikeButtonToggle from '@/app/components/LikeButtonToggle';
import { getTimeComponent } from '@/lib/utils';
import ReplyReadPage from '@/replies/ReplyReadPage';
import ReplyWritePage from '@/replies/ReplyWritePage';
import { GetServerSidePropsContext } from 'next';
import { cookies } from 'next/headers'

const DetailPage = async (context: GetServerSidePropsContext) => {
  let { params } = context;
  if (params?.id == undefined) {
    return;
  }

  const cookieStore = cookies()
  const token = cookieStore.get('accessToken')?.value

  // param valid check
  if (params.id == undefined || Array.isArray(params.id) || token === undefined) {
    return;
  }

  const getReviewRes = await getPostId(params.id ,token );
  let { data } = getReviewRes;

  const reviewStatisticsRes = await reviewStatistics(data?.id, token);
  let { data: statistics } = reviewStatisticsRes;

  
  if (statistics.likeTotal <= -1) {
    statistics.likeTotal = 0;
    console.log("likeTotal", statistics.likeTotal);
  };
  
  return (
    <section className='container'>
      <div className='title-wrapper'>
        <span className='title-desc'>영화에 대한 나의 생각은</span>
        <div className='title'>{data.title}</div>
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
      <div className='like-wrapper'>
        <LikeButtonToggle reviewId={data.id} likeIdValue={data.likeId} isLikeValue={data.isLike} />
        <span>댓글 수: { statistics.replyTotal}</span>
        <span>추천 수: { statistics.likeTotal}</span>
        <span>조회 수: {statistics.viewsTotal}</span>
      </div>
      <ReplyWritePage reviewId={data.id} />
      <ReplyReadPage reviewId={data.id} />
    </section>
  );
};

export default DetailPage;
