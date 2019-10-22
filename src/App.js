import React from 'react';
import './App.css';
import { Router } from "@reach/router";
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Restaurant from './containers/Restaurant';
import MyRestaurant from './containers/MyRestaurant';
import Dashboard from './containers/Dashboard';
import ReviewList from './containers/ReviewList';

function App() {
  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <SignIn path="/signin" />
        <SignUp path="/signup" />
        <Restaurant path="/restaurant" />
        <MyRestaurant path="/myRestaurant" />
        <Dashboard path="/dashboard" />
        <ReviewList path="/reviews" />
      </Router>
    </div>
  );
}

export default App;
