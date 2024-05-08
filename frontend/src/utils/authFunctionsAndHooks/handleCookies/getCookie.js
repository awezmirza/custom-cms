const getCookie = (cname) => {
    const name = cname + "=";
    const cookies = document.cookie;
    const cookiesArray = cookies.split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
        let c = cookiesArray[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

export default getCookie;
