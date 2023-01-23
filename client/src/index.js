import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <DarkModeContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DarkModeContextProvider>
      </BrowserRouter>
    {/* </Provider> */}
  </React.StrictMode>
);
