import { Link } from "react-router-dom";
function EventCard({name,location,id}){

    return(
        <div style={{ width:"46%", backgroundColor:"#4f95f7", borderRadius:"10px"}}>
            <h1>Event Details:</h1>
            <h2>{name}</h2>
            <h6>{location}</h6>
            <Link to={`/events/${id}`}>
            <button style={{ borderRadius:"50px"}}>View More Details</button>
            </Link>
            
        </div>
    )
}

export default EventCard