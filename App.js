import React, { useState } from 'react'

import NAVIGATION from './screens/NAVIGATION'
import { AppContext } from './screens/CONTEXT'


const App = () => {
  const [DownloadList, setDownloadList] = useState([]);

  const dispatchDownloadEvent = (actionType, payload) => {
    switch (actionType) {
      case 'START_DOWNLOADING':
        console.log('Mera naam dispatcher ar mere pass aaggayaa')
        console.log(JSON.stringify(payload,null,4));
        setDownloadList(prevValue => [...prevValue, { id: payload.id, url: payload.url, filename: payload.filename },]);
        return;
      case 'DOWNLOADED_SUCCESSFULLY':
        const newArray = DownloadList.filter(items => items.id !== payload.id);
        setDownloadList(newArray);
        return;
      default:
        return;
    }
  };
  return (
    <AppContext.Provider value={{ DownloadList, dispatchDownloadEvent }}>
      <NAVIGATION />
    </AppContext.Provider>
  )
}

export default App