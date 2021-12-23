import React, { useEffect, useState } from "react";

import Login from "./Login";
import Dashboard from "./Dashboard";

export default function Admin() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const authStorage = localStorage.getItem("auth");
    if (authStorage) setAuth(true);
  }, []);

  return auth ? <Dashboard /> : <Login setAuth={setAuth} />;
}
