const TimeStampToDate = (param: Date) => {
    try {
        const date = new Date(param); 

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}`;
        return formattedDateTime;

    } catch (error) {
        return 'Unknown'
    }
}

const ModTime = (anytime: string) => { // This function will add zeroes to the starting of Dates and Months
    if (anytime.toString().length <= 1) { return ("0" + anytime) } else { return anytime }
}

export default TimeStampToDate;