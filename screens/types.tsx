export type PayloadParams = {
    /* 
        Used by Context
    */
    id: string,
    url: string,
    filename: string
}
export type DownloadingParams = {
    /* 
        Used by Redux
    */
    id: string,
    url: string,
    filename: string,
    fileSize: number,
    downSize: number,
    status: number
}

export type CardStateParams = {
    bg: string,
    text: string,
    iconName: string,
    fontColor: string,
}