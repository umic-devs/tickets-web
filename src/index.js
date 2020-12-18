import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./services/serviceWorker";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
