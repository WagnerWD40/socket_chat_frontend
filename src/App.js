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
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState('');

  return (
      <Router>
        <Switch>
          <PrivateRoute path="/chat/:chatroomName">
            <Chat user={user} setUser={setUser}/>
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard user={user} setUser={setUser}/>
          </PrivateRoute>
          <Route path="/">
            <Home user={user} setUser={setUser}/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
