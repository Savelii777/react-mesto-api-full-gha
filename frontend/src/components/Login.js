import AuthValidation from "./AuthValidation";
import AuthForm from "./AuthForm";

function Login({login}) {

    const {handleChange, errors, formValue } = AuthValidation();

    function handelSubmit(e) {
        e.preventDefault();
        login(formValue.password, formValue.email);
        formValue.password = "";
        formValue.email = "";
    }

    return (
        <main className="content">
            <section className="auth">
                <h2 className="auth__title">Вход</h2>
                <AuthForm
                    onSubmit={handelSubmit}
                    disabled={!(errors.email === "" && errors.password === "")}
                    buttonText={"Войти"}
                >
                    <input
                        id="email"
                        className="popup__input auth__input popup__input_type_email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formValue.email || ''}
                        onChange={handleChange}
                        autoComplete="off"
                        minLength="2"
                        required
                    />
                    <span className={"popup__input-error popup__input-error_active"}>{errors.email}</span>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        className="popup__input auth__input popup__input_type_password"
                        value={formValue.password || ''}
                        onChange={handleChange}
                        minLength="2"
                        required
                    />
                    <span className={"popup__input-error popup__input-error_active"}>{errors.password}</span>
                </AuthForm>
            </section>
        </main>
    );
}

export default Login;