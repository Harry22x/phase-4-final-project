import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);


  function check_session(){
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }
  useEffect(check_session, []);
  return <>
  <header>
  <NavBar setUser={setUser} user={user}/>
  </header>
  <Outlet context ={[setUser, user,check_session]}/>
  </>;
}

export default App;
