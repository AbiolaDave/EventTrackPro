import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import newEvent from "./Components/redux/newEvent";
import "./index.css";

const store = configureStore({
  reducer: {
    newEvent,
  },
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const RootComponent = () => (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

root.render(<RootComponent />);
