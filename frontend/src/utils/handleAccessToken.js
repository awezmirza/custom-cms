const handleAccessToken = (token) => {
    localStorage.setItem("access-token", token);
};

export default handleAccessToken;
