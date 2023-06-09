function PopupWithForm({buttonText, onSubmit, children, popupSm, popupMd, disabled, name, isOpen, title, onClose}) {

    return (
        <section className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
            <div
                className={popupSm ? "popup__container popup-confirmation__container" : popupMd ? "popup__container popup-avatar__container" : "popup__container"}>
                <button
                    className="popup__close-button"
                    aria-label="закрыть"
                    type="button"
                    onClick={onClose}
                />
                <h2 className="popup__title">{title}</h2>
                <form
                    id="add-utility"
                    onSubmit={onSubmit}
                    className={`popup__inputs popup__inputs_${name}`}
                    name={`${name}_form`}
                    noValidate
                >
                    {children}
                    <button
                        disabled={disabled}
                        className={disabled ? "popup__save-button popup__save-button_type_inactive" : popupSm ? "popup__save-button popup-confirmation__button" : "popup__save-button"}
                        type="submit"
                        aria-label="сохранить"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default PopupWithForm;