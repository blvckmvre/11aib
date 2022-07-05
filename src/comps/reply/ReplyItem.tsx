import {FC, RefObject} from 'react'
import { useTypeDispatch } from '../../hooks/redux';
import {modalSlice} from '../../store/reducers/modalSlice';
import { IReply } from '../../types/threadTypes'
import { markdown } from '../../utility/markdown';
import Btn from '../ui/btn/Btn';

interface ReplyItemProps {
    reply: IReply;
    textarea: RefObject<HTMLTextAreaElement>;
}

const ReplyItem:FC<ReplyItemProps> = ({reply, textarea}) => {
  const d = useTypeDispatch();
  const {setCurrentImg} = modalSlice.actions;
  const replyTo = () => {
    textarea.current!.value+='>>'+reply.post_id+'\r\n'
    textarea.current!.scrollIntoView({behavior: 'smooth', block: 'center'})
  }
  return (
    <div id={''+reply.post_id} className='reply'>
        <div className="reply__id">№{reply.post_id}</div>
        <Btn addClass='float__btn small__btn' onClick={replyTo}>{'>>'}</Btn>
        {reply.post_pics && <div className='reply__attach'>{reply.post_pics.map(img=>
            <img 
              loading="lazy"
              key={img.filename} 
              src={img.thumbnail} 
              alt="" 
              className="reply__img" 
              onClick={()=>d(setCurrentImg(img))}
            />
        )}</div>}
        <div className="post__contents">{markdown(reply.post_contents)}</div>
        <div className="reply__timestamp">
          Anonymous posted on: {
            new Date(reply.created_on)
              .toLocaleString('ru-RU',{timeZone: 'Europe/Moscow'})
          }
        </div>
    </div>
  )
}

export default ReplyItem