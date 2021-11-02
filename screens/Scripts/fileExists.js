import RNFetchBlob from "rn-fetch-blob"

var result = false; // Global Var

const fileExists = (path) => {

    RNFetchBlob.fs.exists(path)
        .then((exist) => {
            console.log(`File ${exist ? '' : 'not'} exists at `, path)
            exist ? result = true : result = false
        })
        .catch(() => {
            console.log("Sent Error")
            console.log("Wrong Path Given => ", path)
        })

    return result;
}

export default fileExists
