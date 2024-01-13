import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { SupabaseProvider } from "./context/SupabaseContext";
import Modal from 'react-modal';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import translationsEN from './locales/en/translation.json';
import translationsHI from './locales/hi/translation.json';

i18n.init({
  interpolation: { escapeValue: false },
  lng: 'en', // default language
  resources: {
    en: {
      translation: translationsEN,
    },
    hi: {
      translation: translationsHI,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const appElement = document.getElementById('root'); // replace with the id of your root element


root.render(
  
  <I18nextProvider i18n={i18n}>
    <SupabaseProvider>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </SupabaseProvider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
