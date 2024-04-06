'use client'

import styles from './ReviewWrite.module.css'
import { createPostApi, updateFileApi } from '@/api/route'
import { getCookie } from '@/utils/cookie'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, useState } from 'react'

const ReviewWrite = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [uploadFileIds, setUploadFileIds] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>('')
  const router = useRouter()
  const token = getCookie('accessToken')
  if (token === undefined) return

  const boardWriteSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const postData = {
      title,
      content,
      uploadFileIds,
    }

    await createPostApi(postData, token)
    router.push(`/`)
  }

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files!![0]

    const reader = new FileReader()

    reader.onloadend = () => {
      setSelectedImage(reader.result as string | null)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
    const formData = new FormData()
    formData.append('file', file)

    const response = await updateFileApi(formData, 'MOVIE_REVIEW_IMAGE', token)

    const imageId = response.data.id
    setUploadFileIds((prevUploadFileIds) => [...prevUploadFileIds, imageId])
  }

  return (
    <section className={styles.container}>
      <form className={styles.writeBox} onSubmit={boardWriteSubmit}>
        <div className={styles.titleBox}>
          <input
            className={styles.title}
            type="text"
            required
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요."
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.contentBox}>
            <div className={styles.selectedImgBox}>
              {selectedImage && (
                <img
                  className={styles.selectedImg}
                  src={selectedImage}
                  alt="선택한 이미지"
                />
              )}
            </div>
            <textarea
              className={styles.contents}
              required
              onChange={onChangeContent}
              placeholder="감상평을 작성해보세요."
            />
          </div>
          <div className={styles.buttonWrap}>
            <input
              className={styles.fileUploadInput}
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              id="input-file"
            />
            <label className={styles.fileUploadButton} htmlFor="input-file">
              업로드 이미지
            </label>
            <button className={styles.submitButton} type="submit">
              저장하기
            </button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default ReviewWrite
