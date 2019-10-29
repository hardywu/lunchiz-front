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
import Snack from './containers/Snack';
import NotFound from './components/NotFound';

const theme = createMuiTheme({
  props: {
    // Name of the component ⚛️
    MuiButtonBase: {
      // The properties to apply
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Home path="/" />
        <SignIn path="/login" />
        <SignUp path="/register" />
        <Restaurant path="restaurant/:storeId/*" />
        <Dashboard path="/dashboard/*" />
        <Admin path="/admin/*" />
        <Redirect noThrow from="admin" to="admin/restaurants" />
        <NotFound default />
      </Router>
      <Snack />
    </ThemeProvider>
  );
}

export default App;
