import RNFetchBlob from "rn-fetch-blob";

const AltDownFile = (title,url,ext) => {
    let dirs = RNFetchBlob.fs.dirs;
    const filePath = `${dirs.DocumentDir}`;
    var filename = `${title}.${ext}`;

    RNFetchBlob.config({
        notification : true,
        path: `${dirs.DownloadDir}/UV Downloader/${filename}`,
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
                console.log('error while path \n\n\n\n',err);
            })
        })
        .catch((errorMessage, statusCode) => {
            console.log("error with downloading file", errorMessage)
        })
}
export default AltDownFile

/*
1. The downloaded files will be in the UV Downloader Folder in Downloads foler
2. The folder is created either once or it is replaced everytime a new download is done ? 
        The UV Downloader folder is created only once and the downloaded files are inside the folder
        If there is a existing file with the same name the it automatically get replaced, So when this happend either we can warn the user
        or we can, just donwload it as it is cuz it wouldnt matter to the user except it would result in wastage of internet data.
        P.S. we wont let that happen af if else statement will be applied on the top to check if the file/task exists or not
3. The user can moidify the name of the file at the time of its download
4. We will apply the demo downloading effect in Downloading.js tab using Hooks obvio
5. This feels soo good. 😊😊😊😊😊😊😊
*/