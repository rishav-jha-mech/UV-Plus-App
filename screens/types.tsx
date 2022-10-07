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
    /*
        Used by WebTab
    */
    bg: string,
    text: string,
    iconName: string,
    fontColor: string,
}

type YTDLP_fragments = {
    duration: number,
    path: string
}

export type FormatType = {
    acodec: string,
    audio_ext: string,
    ext: string,
    format: string,
    format_id: string,
    format_note: string,
    fragments: Array<YTDLP_fragments>,
    height: number,
    width: number,
    http_headers: {
        Accept: string,
        "Accept-Encoding": string,
        "Accept-Language": string,
        "Sec-FetchMode": string,
        "User-Agent": string,
    },
    protocol: string,
    resolution: string,
    url: string,
    vcodec: string,
    video_ext: string,
    language: string,
    dynamic_range: string,
    abr: number,
    asr: number,
    filesize: number,
    filesize_approx: number, // When filsize is null
    fps: number,
    language_preference: number,
    quality: number,
    source_preference: number,
    tbr: number,
    vbr: number,
    container: string,
    downloader_options: {
        http_chunk_size: number
    },
}

export type YTDLP_Options = {
    duration: number,
    formats: Array<FormatType>,
    source: string,
    thumbnail: string,
    title: string
}