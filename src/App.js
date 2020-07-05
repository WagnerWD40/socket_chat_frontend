import React, { useState } from 'react';
import './App.css';

import Home from './pages/Home/index';
import Chat from './pages/Chat/index';

function App() {
  const [activeWindow, setActiveWindow] = useState('Chat');
  const [user, setUser] = useState('');

  return (
    <>
    { 
      activeWindow === 'Home'
      ? <Home setActiveWindow={setActiveWindow} user={user} setUser={setUser}/>
      : <Chat setActiveWindow={setActiveWindow} user={user} setUser={setUser}/>
    }
    </>
  );
}

export default App;
