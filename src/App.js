import React , { useState  } from 'react';
import Sidebar from './Sidebar.js'
import Chat from './Chat.js'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {

  const [user, setUser] = useState(null);
  return (
    <div className="App">
      { !user ? (
        <h1>LOGIN PAGE</h1>
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
