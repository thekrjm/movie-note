import './detailPage.styles.css';
import { getPostIdApi, viewTotalApi } from '@/app/api/movie-note-api';
import LikeButtonToggle from '@/app/components/LikeButtonToggle';
import StatisticsInfo from '@/app/components/StatisticsInfo';
import { getTimeComponent } from '@/lib/utils';
import ReplyReadPage from '@/app/replies/ReplyReadPage';
import ReplyWritePage from '@/app/replies/ReplyWritePage';
import { cookies } from 'next/headers';
import DeleteReview from '@/app/board/list/component/DeleteReview';

const DetailPage = async ({
  params
}: {
  params: { id: number }
  }) => {

  const cookieStore = cookies();
  const token = cookieStore.get('accessToken')?.value;

  // 잘못된 파라미터인가? 그러면 return한다
  // number 형식이 아니거나, undefined 거나, null 이거나, array 이거나
  const isNotValidParameter = isNaN(params.id) || !params.id || Array.isArray(params.id)
  if (isNotValidParameter) {
    return;
  }

  // token이 null이어도 호출가능해야함 (null 허용)

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
          <DeleteReview movieReviewId ={data.id} />
          {getTimeComponent(data.createdDateTime)}
        </div>
      </div>
      <div className='content-image-box'>
      <div className='image-wrapper'>
        {data?.uploadFileList[0]?.url ? 
          <img src={data?.uploadFileList[0]?.url} />
          :
          <></>
        }
        </div>
        <div className='content-wrapper'>{data.content}</div>
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