import {FC, useRef, useState} from 'react'
import ThreadFilter from '../comps/thread/ThreadFilter'
import ThreadForm from '../comps/thread/ThreadForm'
import ThreadList from '../comps/thread/ThreadList'
import Btn from '../comps/ui/btn/Btn'
import Loading from '../comps/ui/loading/Loading'
import { threadAPI } from '../store/reducers/threadService'

const Threads:FC = () => {
  const [page,setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const filter_input = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const {data: threads, error, isFetching} = threadAPI.useFetchThreadsQuery({
    input, page, limit
  }, {refetchOnMountOrArgChange: true});


  const nextPage = () => {
    const count = 
      threads ? 
        threads.length ? 
          threads[0].hasOwnProperty('total_count') ? 
          threads[0].total_count : 0 
        : 0 
      : 0;
    if(page<Math.ceil(count/limit)) {
      setPage(p=>p+1);
      window.scrollTo(0,0);
    }
  }
  const prevPage = () => {
    if(page>1){
      setPage(p=>p-1);
      window.scrollTo(0,0);
    }
  }

  const filter = () => {
    setPage(1);
    setInput(filter_input.current!.value);
  }

  return (
    <div className='App'>
      {isFetching && <Loading />}
      {error && <h4>{JSON.stringify(error)}</h4>}
      <ThreadForm setPage={setPage} />
      <ThreadFilter 
        filter={filter} 
        filter_input={filter_input} 
      />
      {threads?.length ? 
      <ThreadList threads={threads} /> :
      <h1>No threads</h1>}
      <div className='pagination__wrapper'>
        <Btn addClass='large__btn' onClick={prevPage}>{'<'}</Btn>
        <Btn addClass='large__btn' onClick={nextPage}>{'>'}</Btn>
      </div>
    </div>
  )
}

export default Threads;