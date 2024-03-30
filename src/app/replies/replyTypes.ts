import { SetStateAction } from "react"

export interface IReplyListType{
  content: string
  createdDateTime:string
  id: number
  member: {
    email: string
    id: number
    nickname: string
  }
  updatedDateTime:string
}

export interface IReplyDeleteButton{
  reviewId: number
  replyId:number
  token:string | undefined
  setReplyList: React.Dispatch<React.SetStateAction<IReplyListType[]>>
  replyIndex: number
}

export interface IReplyUpdateButton{
  replyId: number
  replyContent:string
  setUpdateReplyId: React.Dispatch<SetStateAction<number|null>>
  setUpdateContent: React.Dispatch<SetStateAction<string>>
}
