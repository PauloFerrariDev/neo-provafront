import React from "react";
import { Provider } from "react-redux";
import Home from "src/pages/Home";
import store from "src/store";

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
