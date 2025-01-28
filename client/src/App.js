import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);
  return <>
  <header>
  <NavBar setUser={setUser} user={user}/>
  </header>
  <Outlet context ={[setUser, user]}/>
  </>;
}

export default App;
