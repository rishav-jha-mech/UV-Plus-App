import React from 'react'
import bytesConverter from '../../Scripts/bytesConverter'
import TimeStampToDate from '../../Scripts/TimeStampToDate';
import formatFormatter from '../../Scripts/formatFormatter'
import File from './File';
import Directory from './Directory';


const FileList = (data) => { // By default it is sorted by recent old order

    const { isFile, name, size, mtime } = data.data

    if (isFile()) {
        var ext = formatFormatter(name);
    }

    const fileSize = (bytesConverter(size))
    const date = (TimeStampToDate(mtime))

    return (isFile()) ? (

        <File name={name} fileSize={fileSize} date={date} ext={ext} path={data.data.path} reload={() => data.reload()} />
    ) : (
        <Directory name={name} fileSize={fileSize} date={date} path={data.data.path} reload={() => data.reload()} SetThePath={(path) => data.setthepath(path)} />
    );
}

export default FileList