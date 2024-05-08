const isInvalidUsername = (username) => {
    if (!username) {
        return "Username is required";
    } else if (username.length < 3) {
        return "Username length must be greater than 3";
    } else if (username.length > 15) {
        return "Username length must be smaller than 15";
    }
    username = username.toLowerCase();

    const usernameRegex = /^[a-z0-9_.]+$/;
    if (!usernameRegex.test(username)) {
        return "Username should only contain alphabets, numbers and underscore";
    }
    return null;
};

export default isInvalidUsername;
