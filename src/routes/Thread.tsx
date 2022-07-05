import {FC, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ThreadItem from '../comps/thread/ThreadItem';
import Loading from '../comps/ui/loading/Loading';
import { threadAPI } from '../store/reducers/threadService';

const Thread:FC = () => {
    const {id} = useParams<string>();
    const {data, isFetching, error} = threadAPI.useFetchSingleThreadQuery(id!);

    useEffect(()=>{
      window.scrollTo(0,0);
    },[])

  return (
    <div className='App'>
        {isFetching && <Loading />}
        {error && <h4>{JSON.stringify(error)}</h4>}
        <h1>{data?.title}</h1>
        <div className='thread__list'>
            <ThreadItem isFolded={false} showButton={false} thread={data!} />
        </div>
    </div>
  )
}

export default Thread