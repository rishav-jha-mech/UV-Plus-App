const TimeStampToDate = (date: Date) => {

    var Localdate = new Date(date);
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm: string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;

    const LocalDateString = `${ModTime(`${Localdate.getDate()}`)}-${ModTime(`${parseInt(`${Localdate.getMonth()}`)}` + 1)}-${Localdate.getFullYear()}  ${strTime}`

    return LocalDateString
}

const ModTime = (anytime: string) => { // This function will add zeroes to the starting of Dates and Months
    if (anytime.toString().length <= 1) { return ("0" + anytime) } else { return anytime }
}

export default TimeStampToDate;