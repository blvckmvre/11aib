export const checkFileType = (blob: FileList | null | undefined) => {
    if(blob && Array.from(blob).some(file=>!file.type.includes('image/'))){
        alert('Unexpected file type/s');
        return false
    }
    return true
}

export const checkFileNumber = (blob: FileList | null | undefined) => {
    if(blob && blob.length>4){
        alert('No more than 4 attachments are allowed in a single post');
        return false
    } 
    return true
}