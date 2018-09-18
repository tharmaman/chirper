import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import Navbar from "./Navbar";
import Main from "./Main";
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from "jwt-decode";

// idea of hydration => if server goes down, when page refreshes we can see if there's a token

const store = configureStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken)
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  // e.g. clear the redux store
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  // if they try to modify then force current user to logout
  } catch(e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;