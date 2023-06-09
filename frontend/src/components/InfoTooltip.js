import toolTipSuccess from '../images/toolTipSuccess.svg'
import toolTipError from '../images/toolTipError.svg'

function InfoTooltip ({isOpen, onClose, registerResponse}) {
    return (
        <section className={`popup ${isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container popup__infoTooltip">
                <button
                    className="popup__close-button popup__close-icon_type_infoTooltop"
                    aria-label="закрыть"
                    type="button"
                    onClick={onClose}
                />
                <img src={registerResponse.status ? toolTipSuccess : toolTipError} className="popup__image" alt="регистрация прошла успешно"></img>
                <h2 className="popup__text popup__text-infoTooltip">
                    {registerResponse.text}
                </h2>

            </div>
        </section>
    );
}
export default InfoTooltip