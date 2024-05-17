function convertDateString(dateString) {
    const [day, month, year] = dateString.split("/").map(Number);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return "Invalid Date";
    }

    const date = new Date(year, month - 1, day);
    if (
        date.getDate() !== day ||
        date.getMonth() !== month - 1 ||
        date.getFullYear() !== year
    ) {
        return "Invalid Date";
    }
    return date;
}

export default convertDateString;
