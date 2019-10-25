import React from 'react';
import './App.css';
import { Router, Redirect } from "@reach/router";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Restaurant from './containers/Restaurant';
import Dashboard from './containers/Dashboard';
import Admin from './containers/Admin';
import NotFound from './components/NotFound';

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <ThemeProvider className="App" theme={theme}>
      <Router>
        <Home path="/" />
        <SignIn path="/login" />
        <SignUp path="/register" />
        <Restaurant path="/restaurant/:storeId/*" />
        <Dashboard path="/dashboard/*" />
        <Admin path="/admin/*" />
        <Redirect noThrow from="admin" to="admin/restaurants" />
        <NotFound default />
      </Router>
    </ThemeProvider>
  );
}

export default App;
