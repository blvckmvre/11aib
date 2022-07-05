import {FC, RefObject} from 'react'
import cs from './TextArea.module.css'

interface TextAreaProps {
    content: RefObject<HTMLTextAreaElement>;
}

const TextArea:FC<TextAreaProps> = ({content}) => {
  return (
    <textarea className={cs.TextArea} ref={content} required />
  )
}

export default TextArea