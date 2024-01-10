import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { SupabaseProvider } from "./context/SupabaseContext";
import Modal from 'react-modal';

const root = ReactDOM.createRoot(document.getElementById("root"));
const appElement = document.getElementById('root'); // replace with the id of your root element
if (appElement) {
  Modal.setAppElement(appElement);
}

root.render(
  <SupabaseProvider>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </SupabaseProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
