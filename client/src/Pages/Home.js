import Event from '../components/Event.js';
import { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom"

function Home(){

    const [events,SetEvents] = useState([])
function fetchEvents(){
    fetch('/events')
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