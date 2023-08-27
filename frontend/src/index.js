import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'antd/dist/reset.css' 
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from "react-redux";
import {store} from './redux/store'
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
    <App />
    <Toaster/>
  </React.StrictMode>
  </Provider>
  
);
