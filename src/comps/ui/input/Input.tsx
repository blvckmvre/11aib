import {FC, RefObject} from 'react'
import cs from './Input.module.css'

interface InputProps {
    input: RefObject<HTMLInputElement>;
}

const Input:FC<InputProps> = ({input}) => {
  return (
    <input className={cs.Inp} ref={input} required />
  )
}

export default Input