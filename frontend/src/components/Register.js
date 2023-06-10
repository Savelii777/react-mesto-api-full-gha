
import {Link} from "react-router-dom";
import AuthForm from "./AuthForm";
import AuthValidation from "./AuthValidation";

function Register({register}) {

    const {handleChange, errors, formValue } = AuthValidation();

    function handelSubmit(e) {
        e.preventDefault();
        register(formValue.password, formValue.email);
        formValue.password = "";
        formValue.email = "";
    }

    return (
        <main className="content">
            <section className="auth">
                <h2 className="auth__title">Регистрация</h2>
                <AuthForm
                    onSubmit={handelSubmit}
                    disabled={!(errors.email === "" && errors.password === "")}
                    buttonText={"Зарегистрироваться" }
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
                    <span className={"popup__input-error popup__input-error_active auth__error"}>{errors.email}</span>
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
                    <span className={"popup__input-error popup__input-error_active auth__error"}>{errors.password}</span>
                </AuthForm>
                <Link to="/sign-in" className="auth__caption">
                    Уже зарегистрировались? Войти
                </Link>
            </section>
        </main>
    );
}

export default Register;