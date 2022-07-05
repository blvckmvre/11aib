import {FC, useEffect, useRef} from 'react'
import { IAttach } from '../../../types/threadTypes';
import { useImgScale } from '../../../hooks/useImgScale';
import cs from './Modal.module.css'

interface ModalProps {
    currentImg: IAttach | null;
    clearCurrent: ()=>void;
}

const Modal:FC<ModalProps> = ({currentImg, clearCurrent}) => {
    const rootClasses = [cs.ModalWrapper];
    if(currentImg) {
        rootClasses.push(cs.Active);
    }
    const img = useRef<HTMLImageElement>(null)
    const scaleImg = useImgScale(img.current, !!currentImg);
    useEffect(()=>{
        scaleImg()
    },[currentImg])
  return (
    <div className={rootClasses.join(' ')} onClick={clearCurrent}>
            <img
                draggable={false}
                className={cs.ModalContent} 
                ref={img} 
                src={currentImg ? currentImg.path : ''} 
                alt="" 
            />
    </div>
  )
}

export default Modal