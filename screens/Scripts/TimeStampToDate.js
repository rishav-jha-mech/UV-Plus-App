/*
    Changes in this module cuz react-natvei-fs gives u a date object instaed of a time stamp
*/
const TimeStampToDate = (date) => { // date is an object as this functions paramerter

    LocalDateString = `${date.getFullYear()}-${ModTime(date.getMonth())}-${ModTime(date.getDate())}`
    return LocalDateString
}

const ModTime = (anytime) => { // This function will add zeroes to the starting of Dates and Months
    if (anytime.toString().length <= 1)  { return ("0"+anytime) } else {return anytime}
}

export default TimeStampToDate