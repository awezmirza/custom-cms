import validator from "validator";

const isValidEmail = (email) => {
    if (!email || !validator.isEmail(email)) {
        return false;
    }
    return true;
};

export default isValidEmail;
