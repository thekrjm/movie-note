'use client';

import './LikeButtonToggle.styles.css';
import { useState } from 'react';
import { postLike } from '../api/movie-note-api';

const LikeButtonToggle = (data: any, id: number) => {
  const [like, setLike] = useState(false);

  const handleLikeButton = () => {
    postLike(id);
    setLike(!data.isLike);
  };

  return (
    <span className={like ? 'like' : 'no-like'} onClick={handleLikeButton}>
      좋아요
    </span>
  );
};

export default LikeButtonToggle;
