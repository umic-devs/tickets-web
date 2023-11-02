import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { TicketsProvider } from "context/tickets";

import OrderPage from "pages/Order";

export default function App() {
  return (
    <TicketsProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={OrderPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </TicketsProvider>
  );
}
