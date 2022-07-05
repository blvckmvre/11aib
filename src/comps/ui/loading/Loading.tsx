import {FC} from 'react'
import cs from './Loading.module.css'

const Loading:FC = () => {
  return (
    <svg className={cs.LoadingScreen} width='100%' height='100%'>
      <circle className={cs.LoadingCircle} cx='50vw' cy='50vh' r='100' />
    </svg>
  )
}

export default Loading