import {FC, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useTypeDispatch } from '../../hooks/redux';
import { modalSlice } from '../../store/reducers/modalSlice';
import { IThread } from '../../types/threadTypes'
import { markdown } from '../../utility/markdown';
import ReplyForm from '../reply/ReplyForm';
import ReplyList from '../reply/ReplyList';
import Btn from '../ui/btn/Btn';

interface ThreadItemProps {
    thread: IThread;
    showButton: boolean;
    isFolded: boolean;
}

const ThreadItem:FC<ThreadItemProps> = ({thread, showButton, isFolded}) => {
    const d = useTypeDispatch();
    const {setCurrentImg} = modalSlice.actions;
    const router = useNavigate();
    const post_contents = useRef<HTMLTextAreaElement>(null);
  return thread ? (
    <div className='thread__container'>
        <div className='thread__id'>№{thread.id}</div>
        <h3 className='thread__title'>{thread.title}</h3>
        {thread.attach && <div className="thread__attach">{thread.attach.map(img=>
            <img 
                loading="lazy"
                key={img.filename} 
                className='thread__img' 
                src={img.thumbnail} 
                alt='' 
                onClick={()=>d(setCurrentImg(img))}
            />
        )}</div>}
        <div className="thread__contents">{markdown(thread.contents)}</div>
        <div className="thread__timestamp">
            Anonymous posted on: {
                new Date(thread.created_on)
                    .toLocaleString('ru-RU',{timeZone: 'Europe/Moscow'})
            }
        </div>
        {showButton && <Btn
            addClass='float__btn'
            onClick={()=>router('/'+thread.id)}
        >IN THREAD</Btn>}
        {isFolded && <p className='thread__folded'>({thread.replies.slice(0,-3).length} replies folded)</p>}
        <ReplyList 
            textarea={post_contents} 
            replies={isFolded ? thread.replies.slice(-3) : thread.replies} 
        />
        <ReplyForm 
            post_contents={post_contents} 
            thread_id={thread.id} 
        />
    </div>
  ) : (
    <h1 style={{textAlign: "center"}}>Thread not found</h1>
  )
}

export default ThreadItem