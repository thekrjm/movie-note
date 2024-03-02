import axios from "axios"

export interface PostData {
  title: string
  content: string
}

export const createPost = (data: PostData, accessToken: string) => {
  const url = `https://movie-note-api.keyworddiary.com//api/v1/session-member/movie-reviews`
  return axios.post(url, data, {
    headers: {
      'Authorization': `Bearer ${accessToken}` 
    }
  })
}

export const getPost = () => {
  const url = 'https://movie-note-api.keyworddiary.com/api/v1/movie-reviews'
  return axios.get(url);
}