import axios, { AxiosInstance } from 'axios';

export interface PostData {
  title: string;
  content: string;
  uploadFileIds: number[  ]
}
export interface LoginData {
  email: string;
  password: string;
}

export interface PostRepliesData {
  content: string;
}

export const baseURL = 'https://movie-note-api.keyworddiary.com';

const apiInstance: AxiosInstance = axios.create({
  baseURL,
});

export const loginApi = (data: LoginData) => {
  const url = '/api/v1/auth/login';
  return apiInstance.post(url, data);
};

export const createPost = (data: PostData, accessToken: string) => {
  const url = `/api/v1/session-member/movie-reviews`;
  return apiInstance.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const userDataApi = (accessToken: string) => {
  const url = `/api/v1/session-member`;
  return apiInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getPost = (pageSize: number, query?: string, sort?: string) => {
  const url = '/api/v1/movie-reviews';
  return apiInstance.get(url, {
    params: {
      page: 0,
      size: pageSize,
      query,
      sort
    },
  });
};

export const deleteReviewApi = (id: number, accessToken: string) => {
  const url = `/api/v1/session-member/movie-reviews/${id}`
  return apiInstance.delete(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

export const getPostId = (id: string, accessToken: string) => {
  const url = `/api/v1/movie-reviews/${id}`;
  return apiInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const postLike = (id: number, accessToken: string) => {
  const url = `/api/v1/movie-reviews/${id}/likes`;
  return apiInstance.post(
    url,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};

export const deleteLikeApi = (
  id: number,
  likeId: number,
  accessToken: string,
) => {
  const url = `/api/v1/movie-reviews/${id}/likes/${likeId}`;
  return apiInstance.delete(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const reviewStatistics = (id: number, accessToken: string) => {
  const url = `/api/v1/movie-reviews/${id}/statistics`;
  return apiInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const postReplies = (
  id: number,
  data: PostRepliesData,
  accessToken: string,
) => {
  const url = `/api/v1/movie-reviews/${id}/replies`;
  return apiInstance.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    },
  });
};

export const getRepliesApi = (id: number) => {
  const url = `/api/v1/movie-reviews/${id}/replies`;
  return apiInstance.get(url);
};

export const deleteReplyApi = (
  id: number,
  replyId: number,
  accessToken: string,
) => {
  const url = `/api/v1/movie-reviews/${id}/replies/${replyId}`;
  return apiInstance.delete(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export type FileType = 'MOVIE_REVIEW_IMAGE' | 'MEMBER_PROFILE_IMAGE'

export const updateFileApi = (formData: FormData, fileType: FileType, accessToken: string) => {
  const url = `/api/v1/upload-files`
  return apiInstance.post(url, formData, {
    params: {
      fileType
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })

}
