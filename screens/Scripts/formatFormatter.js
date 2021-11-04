/*
    removeFormatName = (filename) => {Here we will First remove the extension name from the file like => video.mp4
    from here we will remove .mp4 and return mp4, and then we will return the fileName string
    Ex Input => a very good video.mp4 | Return => a very good video 
    }
    giveFormatName = (fileName) => {} Here we will take file name as a parameter and return}
    Ex INput => a very good video.mp4 | Return => .mp4

    So Both of these tasks will be done formatFormatter alone it will take filename as input and provide title and ext as output
*/
const formatFormatter = (filename) => {
    if (filename.includes('.')){ // Sometimes some files may not have a dotextension so thats why this if is necessary or else the lastIndexOf function will gives us a value of -1 meaning false which we dont want :)

        // var lastDotAt = filename.lastIndexOf('.') // Because some files may have an extra dot in their name so we want only the last . this will give eus the index of last dot
        // var FILENAME = filename.slice(0,lastDotAt)
        // var EXTENSION = filename.slice(lastDotAt+1,filename.length) // Here +1 is written because we dont want the dot in our extension
        // We dont want to decrease the speed and increase the size of our app so all the comments above is for the open source enthusiasts like you to understand
        // console.log("FILENAME => ",FILENAME,"EXTENSION => ",EXTENSION)
        return {FILENAME : filename.slice(0,filename.lastIndexOf('.')),EXTENSION: filename.slice(filename.lastIndexOf('.')+1,filename.length)}
        // We are returning a JavaScript Object which contains FileName and Extension
    }else{
        return (filename,null)
    }
}

export default formatFormatter