  'use client';

  import './LikeButtonToggle.styles.css';
  import { useState } from 'react';
  import { deleteLikeApi, postLikeApi } from '../api/movie-note-api';
  import { getCookie } from '../util/CookieUtils';


  const LikeButtonToggle = ({ reviewId, likeIdValue, isLikeValue }: { reviewId: number, likeIdValue: number, isLikeValue: boolean }) => {
    const [isLike, setIsLike] = useState(isLikeValue)
    const [likeId, setLikeId] = useState(likeIdValue)
    const token = getCookie('accessToken')

    const handleLikeButton = async () => {
      if (token === undefined) {
        return<div>에러요</div>;
      }
      if (isLike) {
        await deleteLikeApi(reviewId, likeId, token);
      } else {
        const response = await postLikeApi(reviewId, token);
        setLikeId(response.data.id)
      }
      setIsLike(!isLike)
    };

    return (
      <span className={isLike ? 'like' : 'no-like'} onClick={handleLikeButton}>
        좋아요
      </span>
    );
  };

  export default LikeButtonToggle;
