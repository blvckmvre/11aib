import {FC, FormEvent, SetStateAction, useRef} from 'react'
import { threadAPI } from '../../store/reducers/threadService'
import { IThread } from '../../types/threadTypes';
import { checkFileNumber, checkFileType } from '../../utility/validation';
import Btn from '../ui/btn/Btn';
import Input from '../ui/input/Input';
import Loading from '../ui/loading/Loading';
import TextArea from '../ui/textarea/TextArea';

interface ThreadFormProps {
  setPage: (val: SetStateAction<number>)=>void;
}

const ThreadForm:FC<ThreadFormProps> = ({setPage}) => {

  const title = useRef<HTMLInputElement>(null);
  const contents = useRef<HTMLTextAreaElement>(null);
  const attach = useRef<HTMLInputElement>(null);

  const [createThread, {error, isLoading}] = threadAPI.useCreateThreadMutation();

  const postThread = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(checkFileType(attach.current?.files) && checkFileNumber(attach.current?.files)){
      const d = new FormData();
      d.append('title', title.current!.value);
      d.append('contents', contents.current!.value);
      if(attach.current!.files) Array.from(attach.current!.files).forEach(it=>
        d.append('pic', it)
      )
      await createThread(d as unknown as IThread);
      title.current!.value = '';
      contents.current!.value = '';
      setPage(1);
    }
    attach.current!.value = '';
  }
  return (
    <form className='thread__form' encType='multipart/form-data' onSubmit={e=>postThread(e)}>
      {isLoading && <Loading />}
      {error && <p>{JSON.stringify(error)}</p>}
      <h2 style={{textAlign: 'center'}}>Post a thread</h2>
      <div className='thread__form__field'>
        <p>Title</p>
        <Input input={title} />
      </div>
      <div className='thread__form__field'>
        <p>Contents</p>
        <TextArea content={contents} />
      </div>
      <input ref={attach} multiple type="file" />
      <Btn>Post</Btn>
    </form>
  )
}

export default ThreadForm