import React from 'react';
import './App.css';
import { Router } from "@reach/router";
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Restaurant from './containers/Restaurant';
import Dashboard from './containers/Dashboard';
import Admin from './containers/Admin';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <SignIn path="/signin" />
        <SignUp path="/signup" />
        <Restaurant path="/restaurant/:storeId/*" />
        <Dashboard path="/dashboard/*" />
        <Admin path="/admin/*" />
      </Router>
    </div>
  );
}

export default App;
