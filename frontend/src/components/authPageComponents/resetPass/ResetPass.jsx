import "../../../styles/loginPageStyles/loginAndRegistrationForm.css";
import useResetPass from "./useResetPass.js";

const ResetPass = () => {
    const {
        handleChange,
        inputs,
        submitResetPassFormDetails,
        requestOTP,
        isOTPRequested,
        setIsOTPRequested,
        disabledOtpResendTimeRemaining,
        disabledOtpResend,
        resendOTP
    } = useResetPass();

    return (
        <>
            <h1> Reset Password</h1>
            <form
                onSubmit={submitResetPassFormDetails}
                className="form-container"
                noValidate
            >
                {!isOTPRequested ? (
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
                                placeholder="New Password"
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
                                placeholder="Confirm New Password"
                                className="input-field"
                                type="password"
                                name="confirmPassword"
                                value={inputs.confirmPassword || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="submit-btn"
                            onClick={requestOTP}
                            type="button"
                        >
                            Request OTP
                        </button>
                    </>
                ) : (
                    <>
                        <div className="change-email-container">
                            <span className="change-email-text">
                                OTP sent successfully to <u>{inputs.email}</u>
                            </span>
                            <button
                                className="change-email-button"
                                type="button"
                                onClick={() => {
                                    setIsOTPRequested(false);
                                }}
                            >
                                <span className="material-symbols-rounded">
                                    edit
                                </span>
                            </button>
                        </div>
                        <div className="input-container four-dig-otp-field">
                            <div className="label-icon-container">
                                <span className="material-symbols-rounded label-icon">
                                    key
                                </span>
                            </div>
                            <input
                                placeholder="4 Digit OTP"
                                className="input-field"
                                type="number"
                                name="otp"
                                value={inputs.otp || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="resend-otp-button-container">
                            <button
                                disabled={disabledOtpResend}
                                className="resend-otp-btn"
                                type="button"
                                onClick={resendOTP}
                            >
                                Resend OTP&nbsp;
                                {disabledOtpResend ? (
                                    `(${disabledOtpResendTimeRemaining} seconds)`
                                ) : (
                                    <></>
                                )}
                            </button>
                        </div>
                        <button className="submit-btn" type="submit">
                            Reset Password
                        </button>
                    </>
                )}
            </form>
        </>
    );
};

export default ResetPass;
