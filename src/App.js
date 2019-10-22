import React from 'react';
import './App.css';
import { Router } from "@reach/router";
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Restaurant from './containers/Restaurant';
import MyRestaurant from './containers/MyRestaurant';
import Dashboard from './containers/Dashboard';
import ReviewList from './containers/ReviewList';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Signin path="/signin" />
        <Signup path="/signup" />
        <Restaurant path="/restaurant" />
        <MyRestaurant path="/myRestaurant" />
        <Dashboard path="/dashboard" />
        <ReviewList path="/reviews" />
      </Router>
    </div>
  );
}

export default App;
