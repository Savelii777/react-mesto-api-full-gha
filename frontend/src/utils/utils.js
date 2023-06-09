function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", closeByEsc);
    popup.addEventListener("mousedown", closeByClick);
  }
function hidePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", closeByEsc);
    popup.removeEventListener("mousedown", closeByClick);
}
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_opened'); 
      hidePopup(popup);
    }
  }
  function closeByClick (evt){
    if (evt.target.classList.contains('popup_opened')) {
      hidePopup(evt.target);
    }
  };
export {showPopup, hidePopup, closeByClick, closeByEsc}