'use client';
import { createPost, updateFileApi } from '@/app/api/movie-note-api';
import './boardWrite.styles.css';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContents] = useState('');
  const [uploadFileIds, setUploadFileIds] = useState<number[]>([]);

  const router = useRouter();
  const token = Cookies.get('accessToken');

  const boardWriteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const postData = {
      title, content, uploadFileIds
    }
    
    const response = await createPost(postData, token!!);
    router.push(`/`);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    // change event에서 파일 정보 가져오기
    const file = event.target.files!![0];

    // formData 생성 (주로 파일전송에 사용됨)
    const formData = new FormData();
    formData.append('file', file);

    // api에 파일전송
    const response = await updateFileApi(formData, 'MOVIE_REVIEW_IMAGE', token!!)

    // 전달받은 imageId는 글을 쓸때 함께 전송됨 (boardWrite)
    const imageId = response.data!!.id
    setUploadFileIds(prevUploadFileIds=>[...prevUploadFileIds, imageId])
  }

  return (
    <section className='container'>
      <form className='write-box' onSubmit={boardWriteSubmit}>
        <div className='title-box'>
          <input
            className='input-title'
            type='text'
            id='title'
            value={title}
            required
            onChange={onChangeTitle}
            placeholder='제목을 입력해주세요.'
          />
        </div>
        <div className='content-wrapper'>
          <div className='contents-box'>
            <textarea
              className='textarea-contents'
              id='contents'
              value={content}
              required
              onChange={onChangeContents}
              placeholder='감상평을 작성해보세요.'
            />
            <div>
              <input type='file'  accept='image/*' onChange={onSelectFile} />
            </div>
          </div>
          <div className='btn-wrap'>
            <button className='submit-btn' type='submit'>
              저장하기
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default BoardWrite;
