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

root.render(
  
  <SupabaseProvider>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </SupabaseProvider>
);

reportWebVitals();
