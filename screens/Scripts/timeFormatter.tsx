export const formatTime = (timeInSec: number): string => {
    let hours: any = Math.floor(timeInSec / 3600);
    let minutes: any = Math.floor((timeInSec - (hours * 3600)) / 60);
    let seconds: any = timeInSec - (hours * 3600) - (minutes * 60);

    if (hours > 0) {
        hours = hours < 10 ? '0' + hours : hours;
    }
    if (minutes > 0) {
        minutes = minutes < 10 ? '0' + minutes : minutes;
    }
    if (seconds > 0) {
        seconds = seconds < 10 ? '0' + seconds : seconds;
    }
    if (hours == 0 && minutes != 0) {
        return `${minutes}:${seconds}`
    }
    if (minutes == 0) {
        return `${minutes}0:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}