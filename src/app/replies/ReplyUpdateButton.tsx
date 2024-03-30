import { IReplyUpdateButton } from './replyTypes'


const ReplyUpdateButton = ({replyId, replyContent,setUpdateReplyId,setUpdateContent}:IReplyUpdateButton) => {
  
  const updateReplyHandler = (replyId: number, replyContent: string) => {
    setUpdateReplyId(replyId)
    setUpdateContent(replyContent)
  }

  return (
    <button 
      className='update-btn'
      onClick={()=>updateReplyHandler(replyId, replyContent)}
    >수정</button>
  )
}

export default ReplyUpdateButton