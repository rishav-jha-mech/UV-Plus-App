/*
    Normally you get the 13 digit lastModified code from the file like this which is of strign type 1612321321321 this is called timestamp
    This module is made first to convert the timestamp to date of format =>  YYYY-MM-DD
    Then to convert the single digited Months and Days to two digits by adding a 0 before it.
    Back to RNFETCH Blob :(
*/
const TimeStampToDate = (date) => {

    var Localdate = new Date(date); // This is an OBJECT
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;

    const LocalDateString = `${ModTime(Localdate.getDate())}-${ ModTime(parseInt(Localdate.getMonth())+1) }-${Localdate.getFullYear()}  ${strTime}`

    return LocalDateString
}

const ModTime = (anytime) => { // This function will add zeroes to the starting of Dates and Months
    if (anytime.toString().length <= 1)  { return ("0"+anytime) } else {return anytime}
}

export default TimeStampToDate;