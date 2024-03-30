import './detailPage.styles.css';
import { getPostIdApi } from '@/app/api/movie-note-api';
import LikeButtonToggle from '@/app/components/LikeButtonToggle';
import StatisticsInfo from '@/app/components/StatisticsInfo';
import { getTimeComponent } from '@/lib/utils';
import ReplyWritePage from '@/app/replies/ReplyWritePage';
import { cookies } from 'next/headers';
import DeleteReview from '../components/DeleteReview';
import ReplyReadPage from '@/app/replies/ReplyReadPage';


const DetailPage = async ({
  params
}: {
  params: { id: number }
  }) => {

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  const isNotValidParameter = isNaN(params.id) || !params.id || Array.isArray(params.id)
  if (isNotValidParameter) {
    return;
  }

    const getReviewRes = await getPostIdApi(params.id, token || null);
    let { data } = getReviewRes;

  return (
    <section className='detail-container'>
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
          <DeleteReview movieReviewId ={data.id} token={token} />
          {getTimeComponent(data.createdDateTime)}
        </div>
      </div>
      <div className='content-image-box'>
      <div className='image-wrapper'>
          <img className='image-poster' src={data?.uploadFileList[0]?.url} />
      </div>
        <div className='detailPage-contents-wrapper'>{data.content}</div>
        </div>
      <div className='like-wrapper'>
        <LikeButtonToggle
          reviewId={data.id}
          likeIdValue={data.likeId}
          isLikeValue={data.isLike}
        />
        <StatisticsInfo reviewId={data.id} />
      </div>
      <ReplyWritePage reviewId={data.id} />
      <ReplyReadPage reviewId={data.id}/>
    </section>
  );
};

export default DetailPage;