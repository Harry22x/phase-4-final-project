import Event from '../components/Event.js';
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"

function Home(){

    const [events,SetEvents] = useState([])
function fetchEvents(){
    fetch('https://phase-4-final-project-ttow.onrender.com/events')
    .then(r=>r.json())
    .then(data=> SetEvents(data))
}

useEffect(()=>{fetchEvents()},[])

    return(
        <>
    
        <Outlet/>
        <Event eventData={events}/>
        </>
    )
}

export default Home