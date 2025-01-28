import { Link } from "react-router-dom";
function EventCard({name,location,id}){

    return(
        <div style={{ width:"46%", backgroundColor:"#35393d", borderRadius:"10px"}}>
            <h1>Event Details:</h1>
            <h2>{name}</h2>
            <h6>{location}</h6>
            <Link to={`/events/${id}`}>
            <button className='EventCardButton'>View More Details</button>
            </Link>
            
        </div>
    )
}

export default EventCard