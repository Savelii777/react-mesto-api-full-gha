function AuthForm({disabled, onSubmit, children, buttonText}) {
    return (
        <form className="auth" onSubmit={onSubmit} noValidate>
            <div className="auth__container">
            {children}
            <button
                disabled={disabled}
                className={
                    disabled ? "auth__save-button auth__save-button_type_inactive" : "auth__save-button"
                }
                type="submit"
                aria-label="зарагистрироваться"
            >
                {buttonText}
            </button>
            </div>
        </form>
    );
}

export default AuthForm;