
export const useImgScale = (elem: HTMLImageElement | null, isVisible: boolean) => {
    
    const scaleImageListener = () => {
        let scale = 1;
        if(elem){
            elem.style.transform = 'scale(1)';
            if(isVisible) {
                elem.addEventListener('wheel', (e: WheelEvent)=>{
                    e.preventDefault();
                    scale += e.deltaY * -0.01;
                    scale = Math.min(Math.max(.125, scale), 4);
                    elem.style.transform = `scale(${scale})`;
                })
            } else {
                elem.removeEventListener('wheel', (e: WheelEvent)=>{
                    e.preventDefault();
                    scale += e.deltaY * -0.01;
                    scale = Math.min(Math.max(.125, scale), 4);
                    elem.style.transform = `scale(${scale})`;
                })
            }
        } 
    }

    return scaleImageListener;
}