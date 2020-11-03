import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ComingSoon from "./pages/ComingSoon";
import Comic from "./pages/Comic";

export default function App() {
  useEffect(() => {
    function handleResize() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ComingSoon} />
        <Route path="/comic" component={Comic} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
