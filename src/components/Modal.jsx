import React from "react";
import { useGlobalContext } from "../Context";
const Modal = () => {
    const { selectedMeal, closeModal } = useGlobalContext()
    const { strThumb: image, strMeal: title, strInstruction: text, strSource: source } = selectedMeal
    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <img src={image} alt={title} className="img modal-img" />

                <div className="modal-content">
                    <h4>{title}</h4>
                    <p>cooking Instructions</p>
                    <p>{text}</p>
                    <a href={source} target="_blank">Original Source</a>
                </div>
                <button className="btn btn-hipster close-btn" onClick={closeModal}>close</button>
            </div>
        </aside>
    )
}

export default Modal