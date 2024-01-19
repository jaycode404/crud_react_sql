import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
 
// Paso 3: Importa e invoca dotenv para cargar las variables de entorno
import { config } from 'dotenv';
config();


import { ThemeProvider } from "@material-tailwind/react";
 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);