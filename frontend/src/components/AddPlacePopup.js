import PopupWithForm from "./PopupWithForm";
import {useState, useEffect} from "react";

function AddPlacePopup(props) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const [isValidInputName, setIsValidInputName] = useState(true);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [isValidInputLink, setIsInputLinkValid] = useState(true);
    const [linkErrorMessage, setLinkErrorMessage] = useState("");

    function handleNameChange({target: {value, validity, validationMessage}}) {
        setName(value);
        setIsValidInputName(validity.valid);
        setNameErrorMessage(validity.valid ? "" : validationMessage);
    }

    function handleLinkChange({target: {value, validity, validationMessage}}) {
        setLink(value);
        setIsInputLinkValid(validity.valid);
        setLinkErrorMessage(validity.valid ? "" : validationMessage);
    }

    function handleFormSubmit(evt) {
        evt.preventDefault();
        props.onCardAdd({
            name,
            link,
        });
    }

    useEffect(() => {
        setName("");
        setLink("");
        setNameErrorMessage("");
        setLinkErrorMessage("");
        setIsValidInputName(false);
        setIsInputLinkValid(false);
    }, [props.isOpen]);

    return (
        <PopupWithForm
            disabled={!isValidInputLink || !isValidInputName}
            name="place"
            title={"Новое место"}
            buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
            onSubmit={handleFormSubmit}
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <input
                id="place-name"
                value={name}
                onChange={handleNameChange}
                type="text"
                className="popup__input popup__input_place-name"
                name="placeName"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
            />
            <span
                className={isValidInputName ? "popup__input-error" : "popup__input-error popup__input-error_active"}>{nameErrorMessage}</span>
            <input
                id="place-link"
                value={link}
                onChange={handleLinkChange}
                type="url"
                className="popup__input popup__input_place-link"
                name="placeLink"
                placeholder="Ссылка на изображение"
                required
                minLength="2"
            />
            <span
                className={isValidInputLink ? "popup__input-error" : "popup__input-error popup__input-error_active"}> {linkErrorMessage} </span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;