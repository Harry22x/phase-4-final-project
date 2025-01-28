import {  useOutletContext } from "react-router-dom";
import EventCard from "../components/Eventcard";



function Account(){
    let [onLogin,user] = useOutletContext();
   console.log(user)
    return(
        <>
       
       <h2>Hello {user.username}</h2>
       <h3>Attending events:</h3>
       {user.user_events.map(Data =>(
                <EventCard 
                key = {Data.event_id}
                name={Data.event.name}
                location ={Data.event.location} 
                id = {Data.event_id}/>
            ))}
        </>

    )
}
export default Account