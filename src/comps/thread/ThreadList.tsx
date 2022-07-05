import {FC} from 'react';
import { IThread } from '../../types/threadTypes';
import ThreadItem from './ThreadItem';

interface ThreadListProps {
  threads: IThread[] | undefined;
}

const ThreadList:FC<ThreadListProps> = ({threads}) => {
  return (
    <div className='thread__list'>
      {threads && threads.map(it=>
        <ThreadItem isFolded={true} showButton={true} thread={it} key={it.id} />
      )}
    </div>
  )
}

export default ThreadList