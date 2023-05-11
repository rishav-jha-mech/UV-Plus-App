import React from 'react'
import NAVIGATION from './screens/NAVIGATION'
import { Provider } from 'react-redux';
import { Store } from './screens/REDUX';

const App = () => {

  return (
    <Provider store={Store}>
      <NAVIGATION />
    </Provider>
  )
}

export default App

// The problem is DownloadList.map will not run if DownloadList is empty, now its obvious, 
// to solve this we have to first check if DoqwnloadList is empty, if it is empty then there is no need of checking, 
// we will just start downloading it and if its the list is greater than zero we will check if it does exists before
// adding it to the list

// The final problem to solve is that we have to defineall the progress and data at once only we otherwise
//  everytime a component is rendered downloadFucntion is callled download wil start again, 
// So the download funciton should be called once only !, but then again i ahve to update the proigress and all



// The most important thing that i leanrt today is useState is asyn chronous, so starte doesnot gets changed immediately
// Whats and even bigger disaster, if you set the state and the try to read it and/or update nothing will happen, or it wont work
// the way you think it is supposed to work, so this is nothing todo with react, you are gonna face the same problem everywhere else
// Remember when Linus Torvalds used to say Asynchronous programming is very complex, now i understand what he meant !

//  I was converting the bytes to kilobytes and mbs and all over here only but then how would i show the progress ? huh ?
// And even if the user is not on the Downloading screen this function will keep running, which is adding unneccessary load
// because on our phones, so yeah, we will store it raw, in bytes

// One file can be downloaded at a time, you can download more than one but the screen will flicker.


// I tried to do many optimisations, but none of them were capable enough to stop the flickering of the screen
// Just yesterday i tried react-redux and now i think its time for me to use it, again in a new seperate branch