import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import ThemeContext from "./Theme";

const modalRoot = document.getElementById('modal_contact')


function Modal({children}){
    const theme = useContext(ThemeContext)
    const elRef = useRef(null);
    const Styles = {
        backgroundColor: theme ? "peru": "#8e1db1"
      }
    if(!elRef.current){
        elRef.current = document.createElement('div')
        elRef.current.className = 'overlay'
    }

    useEffect(()=>{
        modalRoot.appendChild(elRef.current)
        return ()=> modalRoot.removeChild(elRef.current)
    },[])

    return createPortal(
        <div className="modal" style={Styles}>
            {children}
        </div>, elRef.current
    )
}


export default Modal