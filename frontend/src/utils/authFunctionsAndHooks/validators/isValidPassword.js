const isValidPassword = (password) => {
    if (!password) {
        return "Password is required";
    }
    if (password.length < 8) {
        return "Password should be of at least 8 characters";
    }
    return null;
};

export default isValidPassword;
