import {  useOutletContext } from "react-router-dom";
import EventCard from "../components/Eventcard";
import MyEventCard from "../components/MyEventCard";
import "../components/LoadingAnimation.css"


function Account(){
    let [onLogin,user] = useOutletContext();
   //console.log(user.user_events)
   if (!user) {
    return (
        <div>
      
          <div className="loader">
        <div className="spinner"></div>
      </div>
        </div>
      );
}
    return(
        <>
       
       <h2>Hello {user.username}</h2>
        
       <h3>Attending events:</h3>
       {user.user_events.map(Data =>{
       if(Data.role=='Atendee'){return(
        <EventCard 
        key = {Data.id}
        name={Data.event.name}
        location ={Data.event.location} 
        id = {Data.event_id}/>
       )
       }
       })}
       <h3>My events:</h3>
       {user.user_events.map(Data =>{
       if(Data.role=='Organizor'){return(
        <MyEventCard 
        key = {Data.id}
        name={Data.event.name}
        location ={Data.event.location} 
        time = {Data.event.time}
        id = {Data.event_id}/>
       )
       }
       })}
        </>

    )
}
export default Account