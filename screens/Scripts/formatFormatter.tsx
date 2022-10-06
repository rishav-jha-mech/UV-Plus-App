const formatFormatter = (filename: string): string => {
    if (filename.includes('.')){
        return filename.slice(filename.lastIndexOf('.')+1,filename.length);        
    }else{
        return 'Unknown'
    }
}
export default formatFormatter