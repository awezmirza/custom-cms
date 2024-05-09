import { useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";
import useLoginForm from "../../utils/authFunctionsAndHooks/handleForm/useLoginForm";

const LoginForm = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleLoginSubmit = useLoginForm();

    return (
        <>
            <h1 className="auth-label">Login</h1>
            <form
                className="form-container"
                onSubmit={(e) => handleLoginSubmit(e, inputs)}
                noValidate
            >
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            person
                        </span>
                    </div>
                    <input
                        placeholder="Email"
                        className="input-field"
                        type="email"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <div className="label-icon-container">
                        <span className="material-symbols-rounded label-icon">
                            lock
                        </span>
                    </div>
                    <input
                        placeholder="Password"
                        className="input-field"
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </div>
                <button className="submit-btn" type="submit">
                    Login
                </button>
            </form>
        </>
    );
};

export default LoginForm;
