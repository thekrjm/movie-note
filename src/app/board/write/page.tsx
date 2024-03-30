'use client';
import { createPostApi, updateFileApi } from '@/app/api/movie-note-api';
import './reviewWrite.styles.css';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/app/util/CookieUtils';



const ReveiwWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploadFileIds, setUploadFileIds] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<string|null>('');
  const router = useRouter();
  const token = getCookie('accessToken');
  if (token === undefined) return;

  const boardWriteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const postData = {
      title, content, uploadFileIds
    }
    
    await createPostApi(postData, token);
    router.push(`/`);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files!![0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string | null);
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await updateFileApi(formData, 'MOVIE_REVIEW_IMAGE', token!!)

    const imageId = response.data.id
    setUploadFileIds(prevUploadFileIds=>[...prevUploadFileIds, imageId])
  }

  return (
    <section className='container'>
      <form className='write-box' onSubmit={boardWriteSubmit}>
        <div className='title-box'>
          <input
            className='input-title'
            type='text'
            required
            onChange={onChangeTitle}
            placeholder='제목을 입력해주세요.'
          />
        </div>
        <div className='content-wrapper'>
          <div className='contents-box'>
            <div className='select-img-box'>
              {selectedImage && (
                <img className='select-img'  src={selectedImage} alt="선택한 이미지" />
               )}
            </div>
            <textarea
              className='textarea-contents'
              required
              onChange={onChangeContent}
              placeholder='감상평을 작성해보세요.'
            />
          </div>
          <div className='btn-wrap'>
            <input type='file'  accept='image/*' onChange={onSelectFile} />
            <button className='submit-btn' type='submit'>
              저장하기
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ReveiwWrite;
