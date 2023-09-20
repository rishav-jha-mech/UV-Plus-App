const bytesConverter = (bytes: number, decimals = 2): string => {
    try {
        if (bytes === 0) return '0 B';
        if (bytes === null) return 'Unknown'
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const prefix = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        const suffix = sizes[i];
        if (Number.isNaN(prefix) || suffix == undefined) {
            return '0 B'
        }
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    } catch (error) {
        return '0 B'
    }
}

export default bytesConverter