import React from 'react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { hydrate, render } from "react-dom";
import './index.css'
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}


reportWebVitals();
