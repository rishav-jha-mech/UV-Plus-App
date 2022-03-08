/*
    Normally you get the 13 digit lastModified code from the file like this which is of strign type 1612321321321 this is called timestamp
    This module is made first to convert the timestamp to date of format =>  YYYY-MM-DD
    Then to convert the single digited Months and Days to two digits by adding a 0 before it.
    Back to RNFETCH Blob :(
*/
const TimeStampToDate = (date) => {

    var timestamp = parseInt(date) // Its a string we have to parse it as a int or we will get error :)
    var Localdate = new Date(timestamp); // This is an OBJECT
    // console.log(`TimeStamp => ${Localdate}`)
    LocalDateString = `${ModTime(Localdate.getDate())}-${ ModTime(parseInt(Localdate.getMonth())+1) }-${Localdate.getFullYear()} `
    return LocalDateString
}

const ModTime = (anytime) => { // This function will add zeroes to the starting of Dates and Months
    if (anytime.toString().length <= 1)  { return ("0"+anytime) } else {return anytime}
}

export default TimeStampToDate 