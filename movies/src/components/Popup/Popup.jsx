import React from "react";
import './Popup.css';

function Popup ({
  isPopupOpen,
  popupErrorCode,
  popupErrorMessage,
  closePopup}){

  return(
    <div className={`${isPopupOpen && "popup"}`}>
      <h1 className="popup__title">{popupErrorCode}</h1>
      <p className="popup__subtitle">{popupErrorMessage}</p>
      <button className="popup__button" onClick={closePopup} >Назад</button>
    </div>
  )
}

export default Popup;
