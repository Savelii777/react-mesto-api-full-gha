import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";

function EditAvatarPopup(props) {
    const inputRef = useRef("");
    const [isValidInput, setIsValidInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function onChange({target: {validity, validationMessage}}) {
        setIsValidInput(validity.valid);
        setErrorMessage(validity.valid ? "" : validationMessage);
    }

    useEffect(() => {
        setIsValidInput(false);
        setErrorMessage("");
        inputRef.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        const {onAvatarUpdate} = props;
        const avatar = inputRef.current.value;

        onAvatarUpdate({avatar});
    }

    return (
        <PopupWithForm
            disabled={!isValidInput}
            popupMd={true}
            name="avatar"
            title={"Обновить аватар"}
            buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
            onSubmit={handleSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input
                id="avatar-input"
                ref={inputRef}
                type="url"
                className="popup__input popup__input_type_avatar"
                name="avatar"
                placeholder="Ссылка на картинку"
                required
                onChange={onChange}
            />
            <span
                className={isValidInput ? "popup__input-error" : "popup__input-error popup__input-error_active"}>{errorMessage}</span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;