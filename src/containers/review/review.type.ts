export interface IPageInfo {
  last: boolean
}

export interface IReviewMore {
  query?: string
  sort?: string
  pageInfoProps: IPageInfo
}

export interface moviewReview {
  movieReviewId: number
  token: string | undefined
}

export interface IReviews {
  id: number
  title: string
  content: string
  uploadFileList: IReviewsUploadFileList[]
  createdDateTime: string
  member: {
    id: number
    nickname: string
    email: string
    profileImageUrl: string | null
  }
}

export interface IReviewsUploadFileList {
  id: number
  s3Key: string
  url: string
  type: string
  createdDateTime: string
  updatedDateTime: string
}
