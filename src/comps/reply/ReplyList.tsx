import {FC, RefObject} from 'react'
import { IReply } from '../../types/threadTypes'
import ReplyItem from './ReplyItem';

interface ReplyListProps {
  replies: IReply[];
  textarea: RefObject<HTMLTextAreaElement>;
}

const ReplyList:FC<ReplyListProps> = ({replies, textarea}) => {
  return (
    <div className='thread__replies'>
      {replies[0] && replies.map(post=>
        <ReplyItem 
          textarea={textarea} 
          reply={post} 
          key={post.post_id} 
        />
      )}
    </div>
  )
}

export default ReplyList