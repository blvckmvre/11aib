import {FC, ReactNode} from 'react'
import cs from './Btn.module.css'

interface BtnProps {
    children: ReactNode;
    onClick?: ()=>void;
    addClass?: string;
}

const Btn:FC<BtnProps> = ({children, onClick, addClass}) => {
  return (
    <button className={addClass ? cs.Btn+' '+addClass : cs.Btn} onClick={onClick}>{children}</button>
  )
}

export default Btn