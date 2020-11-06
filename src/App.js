import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ComingSoon from "./pages/ComingSoon";
import Comic from "./pages/Comic";

export default function App() {
  const [isTimeOver, setIsTimeOver] = useState();

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
        {isTimeOver ? (
          <Route path="/" component={Comic} />
        ) : (
          <Route
            path="/"
            exact
            render={(props) => (
              <ComingSoon {...props} setIsTimeOver={setIsTimeOver} />
            )}
          />
        )}
        <Route path="/comic" component={Comic} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
