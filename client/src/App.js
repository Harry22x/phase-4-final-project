import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);


  async function check_session() {
    try {
      const response = await fetch("https://phase-4-final-project-ttow.onrender.com/check_session", {
        method: "GET",
        credentials: "include"
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return userData; // Return the user data for components that need it immediately
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
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
