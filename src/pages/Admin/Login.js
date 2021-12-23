import React, { useState } from "react";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      username === process.env.REACT_APP_ADMIN_LOGIN &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      localStorage.setItem("auth", true);
      setAuth(true);
    } else {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={() => handleLogin()}>
        Login
      </button>
    </div>
  );
};

export default Login;
