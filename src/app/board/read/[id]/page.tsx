import './detailPage.styles.css';
import { getPostId } from '@/app/api/movie-note-api';
import LikeButtonToggle from '@/app/components/LikeButtonToggle';
import LikeButton from '@/app/components/LikeButtonToggle';
import { getTimeComponent } from '@/lib/utils';
import { GetServerSidePropsContext } from 'next';

const DetailPage = async (context: GetServerSidePropsContext) => {
  let { params } = context;
  if (params?.id == undefined) {
    return;
  }

  const response = await getPostId(params.id as string);
  let { data } = response;

  return (
    <section className='container'>
      <div className='title-wrapper'>
        <span className='title-desc'>영화에 대한 나의 생각은</span>
        <div className='title'>{data.title}</div>
        <LikeButtonToggle data={data} id={data.id}>
          좋아요
        </LikeButtonToggle>
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
      <div className='like-wrapper'></div>
    </section>
  );
};

export default DetailPage;
