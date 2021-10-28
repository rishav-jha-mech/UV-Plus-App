import RNFetchBlob from "rn-fetch-blob";

const AltDownFile = (title,url,ext) => {
    let dirs = RNFetchBlob.fs.dirs;
    const filePath = `${dirs.DocumentDir}`;
    var filename = `${title}.${ext}`;
    RNFetchBlob.config({
        notification : true,
        path: `${dirs.DownloadDir}/${filename}`,
        fileCache: false,
        useDownloadManager : true,
    })
        .fetch('GET', url,{
            'Cache-Control': 'no-store'
        })
        .progress({ interval: 250 }, (received, total) => {
            console.log("downloadProgress",(received / total) * 100)
        })
        .then(res => {
            RNFetchBlob.fs.stat(res.path()).then(stats=>{
                console.log(stats);
            }).catch(err=>{
                console.log('error while getting mimetypes');
            })
            RNFetchBlob.fs.exists(res.path()).then(exist=>{
                console.log(`file ${exist ? '' : 'not'} exists`)
            }).catch(
                err=>console.log('error while checking existance',err)
            );
        })
        .catch((errorMessage, statusCode) => {
            console.log("error with downloading file", errorMessage)
        })
}
export default AltDownFile