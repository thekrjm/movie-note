import { deleteReplyApi} from '../api/movie-note-api';
import { IReplyDeleteButton } from './replyTypes';



const ReplyDeleteButton = ({ reviewId, replyId, token, replyIndex, setReplyList }:IReplyDeleteButton) => {

  const deleteReplyHandler = async (replyId:number, replyIndex:number) => {
    const deleteConfirm = window.confirm("댓글을 삭제하시겠습니까?")
    if (deleteConfirm) {      
      await deleteReplyApi(reviewId, replyId, token!!);
      setReplyList(prevList => {
        prevList.splice(replyIndex, 1)
        return [...prevList];
      })
    }
  };

  return (
          <button
            className='delete-btn'
            onClick={() => deleteReplyHandler(replyId, replyIndex)}
          >
  삭제
  </button>)

}

export default ReplyDeleteButton