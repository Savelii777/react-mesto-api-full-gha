function ImagePopup({card, isOpen, onClose}) {
    return (
        <div
            onClick={onClose}
            className={`popup popup-card  ${isOpen ? `popup_opened` : ""}`}
        >
            <figure className="popup-card__container">
                <img
                    className="popup-card__image"
                    src={card.link}
                    alt={`${card.name}`}
                />
                <figcaption className="popup-card__caption">{card.name}</figcaption>
                <button
                    type="button"
                    className="popup__close-button popup-card__close-button"
                ></button>
            </figure>
        </div>
    );
}

export default ImagePopup;