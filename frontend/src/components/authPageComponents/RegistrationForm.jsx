import "../../styles/loginPageStyles/loginAndRegistrationForm.css";
import useRegisterForm from "../../utils/authFunctionsAndHooks/handleForm/useRegisterForm";

const RegistrationForm = () => {
    const { handleRegisterFormSubmit, handleChange, inputs } =
        useRegisterForm();

    return (
        <>
            <h1 className="auth-label">Register</h1>
            <form
                className="form-container"
                onSubmit={(e) => handleRegisterFormSubmit(e, inputs)}
                noValidate
            >
                {
                    <>
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
                        {/* TODO - Add show/Hide password feature */}
                        <div className="input-container">
                            <div className="label-icon-container">
                                <span className="material-symbols-rounded label-icon">
                                    lock
                                </span>
                            </div>
                            <input
                                placeholder="Confirm password"
                                className="input-field"
                                type="password"
                                name="confirmPassword"
                                value={inputs.confirmPassword || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="submit-btn" type="submit">
                            Register
                        </button>
                    </>
                }
            </form>
        </>
    );
};

export default RegistrationForm;
