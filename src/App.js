import React, { useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home/index';
import Chat from './pages/Chat/index';
import Dashboard from './pages/Dashboard';

function App() {
  const [user, setUser] = useState('');

  return (
      <Router>
        <Switch>
          <Route path="/chat/:chatroomName">
            <Chat user={user} setUser={setUser}/>
          </Route>
          <Route path="/dashboard">
            <Dashboard user={user} setUser={setUser}/>
          </Route>
          <Route path="/">
            <Home user={user} setUser={setUser}/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
