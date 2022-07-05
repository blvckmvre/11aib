import {FC, FormEvent, RefObject, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { threadAPI } from '../../store/reducers/threadService';
import { IReply } from '../../types/threadTypes';
import { checkFileNumber, checkFileType } from '../../utility/validation';
import Btn from '../ui/btn/Btn';
import Loading from '../ui/loading/Loading';
import TextArea from '../ui/textarea/TextArea';

interface ReplyFormProps {
  thread_id: number;
  post_contents: RefObject<HTMLTextAreaElement>;
}

const ReplyForm:FC<ReplyFormProps> = ({thread_id, post_contents}) => {
  const post_attach = useRef<HTMLInputElement>(null);

  const router = useNavigate();

  const [createPost, {error, isLoading}] = threadAPI.useCreateReplyMutation();

  const postReply = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(checkFileType(post_attach.current?.files) && checkFileNumber(post_attach.current?.files)){
      const d = new FormData();
      d.append('post_contents', post_contents.current!.value);
      d.append('thread_id', ''+thread_id)
      if(post_attach.current!.files) Array.from(post_attach.current!.files).forEach(it=>
        d.append('postpic', it)
      )
      await createPost(d as unknown as IReply);
      post_contents.current!.value = '';
      router("/"+thread_id);
    }
    post_attach.current!.value = '';
  }

  return (
    <form className='reply__form' encType='multipart/form-data' onSubmit={e=>postReply(e)}>
      {isLoading && <Loading />}
      {error && <p>{JSON.stringify(error)}</p>}
      <h3 style={{textAlign: 'center'}}>Post a reply</h3>
      <TextArea content={post_contents}/>
      <input ref={post_attach} multiple accept="image/*" type="file" />
      <Btn>Post</Btn>
    </form>
  )
}

export default ReplyForm