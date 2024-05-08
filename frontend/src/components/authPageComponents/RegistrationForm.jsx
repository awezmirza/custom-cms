import { useState } from "react";
import "../../styles/loginPageStyles/loginAndRegistrationForm.css";
import useRegisterForm from "../../utils/authFunctionsAndHooks/handleForm/useRegisterForm";
import useRegistrationOTPVerification from "../../utils/authFunctionsAndHooks/handleForm/useRegistrationOTPVerification";

const RegistrationForm = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(true);

    const { handleRegisterFormSubmit, handleChange, inputs } =
        useRegisterForm();

    const { requestOtp } = useRegistrationOTPVerification();

    // TODO - Implement debouncing for username

    return (
        <>
            <h1>Register</h1>
            <form
                className="form-container"
                onSubmit={(e) => handleRegisterFormSubmit(e, inputs)}
                noValidate
            >
                {showRegisterForm ? (
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
                                    alternate_email
                                </span>
                            </div>
                            <input
                                placeholder="Username"
                                className="input-field"
                                type="text"
                                name="username"
                                value={inputs.username || ""}
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
                        <button
                            className="submit-btn"
                            type="button"
                            onClick={() => {
                                // TODO - Handle this
                                requestOtp(inputs, setShowRegisterForm);
                            }}
                        >
                            Proceed
                        </button>
                    </>
                ) : (
                    <>
                        OTP Page
                        <button className="submit-btn" type="submit">
                            Submit
                        </button>
                    </>
                )}
            </form>
        </>
    );
};

export default RegistrationForm;
