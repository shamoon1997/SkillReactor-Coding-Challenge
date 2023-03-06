import React from 'react'
import {AiOutlineClose} from "react-icons/ai";
import "./Modal.css"
interface IData{
    imgLink?:string,
    imageName?:string
    handleCloseModal: ()=> void
}
function Modal({imgLink, imageName, handleCloseModal}:IData) {
    return (
        <div>
            <div className="modalContainer">
                <div className="imageBox">
                <img className="modalImage"src={imgLink} alt="" />
                <div>
                    <p>{imageName}</p>
                </div>
                <AiOutlineClose className="iconClose" onClick={()=>handleCloseModal()}/>
                </div>

            </div>
            
        </div>
    )
}

export default Modal
