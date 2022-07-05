import {FC, RefObject} from 'react'
import Btn from '../ui/btn/Btn';
import Input from '../ui/input/Input'

interface ThreadFilterProps {
    filter_input: RefObject<HTMLInputElement>;
    filter: ()=>void;
}

const ThreadFilter:FC<ThreadFilterProps> = ({filter_input, filter}) => {

  return (
    <div className='thread__filter'>
        <Input input={filter_input} />
        <Btn onClick={filter}>Filter</Btn>
    </div>
  )
}

export default ThreadFilter