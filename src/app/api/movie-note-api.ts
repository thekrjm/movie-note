import axios from 'axios';

export interface PostData {
  title: string;
  content: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export const loginApi = (data: LoginData) => {
  const url = 'https://movie-note-api.keyworddiary.com/api/v1/auth/login';
  return axios.post(url, data);
};

export const createPost = (data: PostData, accessToken: string) => {
  const url = `https://movie-note-api.keyworddiary.com//api/v1/session-member/movie-reviews`;
  return axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPost = () => {
  const url = 'https://movie-note-api.keyworddiary.com/api/v1/movie-reviews';
  return axios.get(url);
};

export const getPostId = (id: string) => {
  const url = `https://movie-note-api.keyworddiary.com/api/v1/movie-reviews/${id}`;
  return axios.get(url);
};

export const postLike = (id: number) => {
  const url = `https://movie-note-api.keyworddiary.com/api/v1/movie-reviews/${id}/likes`;
  return axios.post(url);
};
