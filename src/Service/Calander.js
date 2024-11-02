const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
};

function formateDate(date) {
    const lastDigit = date % 10;
    let suffix
    if (date >= 11 && date <= 13) {
        suffix = "th"

    } else if (lastDigit === 1) {
        suffix = "st"

    } else if (lastDigit === 2) {
        suffix = "nd"

    } else if (lastDigit === 3) {
        suffix = "rd"
    } else {
        suffix = "th"
    }

    return date + suffix;
}

const getTodayDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const date = currentDate.getDate();

    const formattedDate = formateDate(date) + " " + months[month] + ", " + year;

    return formattedDate;
};
export default getTodayDate
