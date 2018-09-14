import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "../store";

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Router>
      <div>Hello World!</div>
    </Router>
  </Provider>
)

export default App;