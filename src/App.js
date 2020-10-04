import React , { useState  } from 'react';
import Sidebar from './Sidebar.js'
import Chat from './Chat.js'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "./Login"
import { useStateValue } from "./StateProvider.js";


function App() {

  const [{user},dispatch] = useStateValue();
  return (
    <div className="App">
      { !user ? (
        <Login/>
      ) : (
        <div className="app_body">
        <Router>
                <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
                <Chat/>
            </Route>
            <Route path="/">
                <Chat/>
            </Route>
          </Switch>
        </Router>
        </div>
      )}
    </div>
  );
}

export default App;
