import React from 'react'

import NAVIGATION from './screens/NAVIGATION'
import { AppContext } from './screens/CONTEXT'


const App = () => {
  const [users, setUsers] = useState([]);

  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'START_DOWNLOADING':
        setUsers([...users, payload.newUser]);
        return;
      case 'DOWNLOAD_COMPLETE':
        setUsers(users.filter(user => user.id !== payload.userId));
        return;
      default:
        return;
    }
  };
  return (
    <AppContext.Provider value={{ users, dispatchUserEvent }}>
      <NAVIGATION />
    </AppContext.Provider>
  )
}

export default App