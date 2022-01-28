import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin/index";
import IngressosCOMIC from "./pages/IngressosCOMIC";

export const CartContext = createContext()

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

  const defaultCart = JSON.parse(localStorage.getItem('cart')) || []
  const [cart, setCart] = useState(defaultCart)

  function updateCart(item) {
    const nextCart = composeCart({ cart, item })
    localStorage.setItem('cart', JSON.stringify(nextCart))
    setCart(nextCart)
  }

  return (
    <CartContext.Provider value={{ cart, updateCart }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/ingressos-comic-2022" exact component={IngressosCOMIC} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

function composeCart({ cart, item }) {
  const nextCart = cart.filter(cartItem => cartItem.product.sku !== item.product.sku)
  if(!item.amount) return nextCart

  return [item, ...nextCart]
}
