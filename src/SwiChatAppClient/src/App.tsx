import React from "react";
import { useAuth } from "./components/AuthContext";
import Login from "./components/Login";
import Messenger from "./components/Messenger";

const App: React.FC = () => {
  const { user } = useAuth();

  return (
<div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {user ? <Messenger /> : <Login />}
    </div>
  );
};


export default App;
