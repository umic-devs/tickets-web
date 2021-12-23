import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin/index";
import IngressosCOMIC from "./pages/IngressosCOMIC";

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
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={Admin} />
        <Route path="/ingressos-comic-2022" exact component={IngressosCOMIC} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}
