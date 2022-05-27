import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import style from './ModalWindow.module.scss';

export const ModalWindow = ({visible, title, children, onClose} ) => {
    const [mounted, setIsMounred] = useState(false);
    const root = useRef();

    useEffect(() => {
        const onKeyDownHandler = ({key}) => {
            if(key === 'Escape'){
                onClose();
            }
        };
        setIsMounred(true);
        if(window){
            root.current = document.getElementById('modal') || undefined;
        }
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeyDownHandler);
        
        return() => {
            document.body.style.overflow = 'visible';
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    },[mounted]);

    const modalView = visible ? (<div className={style.ModalWindow} onClick={onClose}>
        <div className={style.modal_dialog} onClick={e => e.stopPropagation()}>
            
            <div className={style.modal_header}>
                <h3 className={style.modal_title}>{title}</h3>
                <button className={style.modal_close}
                    onClick={onClose}>&times; </button>
            </div>

            <div className={style.modal_body}>
                <div className={style.modal_content}>{children}</div>
            </div>
        
        </div>
    </div>): null;

 
    return(mounted && root.current  ? createPortal(modalView, root.current) : null);
};