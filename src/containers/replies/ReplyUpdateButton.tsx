import { IReplyUpdateButton } from './Reply.type'

const ReplyUpdateButton = ({
  replyId,
  replyContent,
  setUpdateReplyId,
  setUpdateContent,
}: IReplyUpdateButton) => {
  const updateReplyHandler = (replyId: number, replyContent: string) => {
    setUpdateReplyId(replyId)
    setUpdateContent(replyContent)
  }

  return (
    <button
      style={{ fontSize: '14px', marginRight: '7px' }}
      onClick={() => updateReplyHandler(replyId, replyContent)}
    >
      수정
    </button>
  )
}

export default ReplyUpdateButton
