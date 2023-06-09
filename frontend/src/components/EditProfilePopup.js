import PopupWithForm from "./PopupWithForm";
import {useEffect, useState, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    const [isValidInputName, setIsValidInputName] = useState(true);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [isValidInputDescription, setIsInputDescriptionValid] = useState(true);
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

    function handleNameChange({target: {value, validity, validationMessage}}) {
        setName(value);
        setIsValidInputName(validity.valid);
        setNameErrorMessage(validity.valid ? "" : validationMessage);
    }

    function handleDescriptionChange({target: {value, validity, validationMessage}}) {
        setDescription(value);
        setIsInputDescriptionValid(validity.valid);
        setDescriptionErrorMessage(validity.valid ? "" : validationMessage);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUserUpdate({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setNameErrorMessage("");
        setDescriptionErrorMessage("");
        setIsValidInputName(true);
        setIsInputDescriptionValid(true);
        if (props.isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [props.isOpen, currentUser]);

    return (
        <PopupWithForm
            disabled={!(nameErrorMessage === "" && descriptionErrorMessage === "")}
            name="profile"
            title={"Редактировать профиль"}
            buttonText={props.isLoading ? `Сохранение...` : `Сохранить`}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
        >
            <input
                id="name-input"
                value={name}
                onChange={handleNameChange}
                type="text"
                className="popup__input popup__input_type_name"
                name="name"
                placeholder="введите имя пользователя"
                required
                minLength="2"
                maxLength="40"
            />
            <span
                className={isValidInputName ? "popup__input-error" : "popup__input-error popup__input-error_active"}>{nameErrorMessage}</span>
            <input
                id="job-input"
                value={description}
                onChange={handleDescriptionChange}
                type="text"
                className="popup__input popup__input_type_job"
                name="description"
                placeholder="введите работу пользователя"
                required
                minLength="4"
                maxLength="200"
            />
            <span
                className={isValidInputDescription ? "popup__input-error" : "popup__input-error popup__input-error_active"}>{descriptionErrorMessage}</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;