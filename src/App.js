import React from "react";
import { ToastProvider } from "react-toast-notifications";

import "./App.css";
import Routers from "./chat/router/Routers";

function App() {
  return (
    <ToastProvider autoDismissTimeout="2000">
      <div className="container  h-100 ">
        <Routers />
      </div>
    </ToastProvider>
  );
}

export default App;
