import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList";
import NewMessage from "../components/NewMessage";
import {useOutletContext,useNavigate } from "react-router-dom";


function EventPage(){
  const navigate = useNavigate();

  let [onLogin,user,check_session] = useOutletContext();
  const[attending, setAttending] = useState(false)

  if(!user){
      navigate('/login')
  }
    
    const [{ data: event, error, status }, setEvent] = useState({
        data: null,
        error: null,
        status: "pending",
      });
      const { id } = useParams();
    
      function getEvent(){
        fetch(`https://phase-4-final-project-ttow.onrender.com/events/${id}`).then((r) => {
          if (r.ok) {
            r.json().then((event) =>
                setEvent({ data: event, error: null, status: "resolved" })
            );
          } else {
            r.json().then((err) =>
                setEvent({ data: null, error: err.error, status: "rejected" })
            );
          }
        })
        
      }
      useEffect(getEvent, [id]);


      async function attendEvent() {
        try {
          const response = await fetch('https://phase-4-final-project-ttow.onrender.com/user_events', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              event_id: id,
              user_id: user.id,
              role: 'Atendee'
            }),
          });
    
          if (response.ok) {
            // Wait for the event data to be updated
            await getEvent();
            setAttending(true);
            // Update the user session to reflect new changes
            await check_session();
          }
        } catch (error) {
          console.error("Error attending event:", error);
        }
      }
    

      if (status === "pending") return <h1>Loading...</h1>;
      if (status === "rejected") return <h1>Error: {error.error}</h1>;
    return(
        <>
        <div style={{textAlign:"center"}}>
        <h1>{event.name}</h1>
        <h2>Location:{event.location}</h2>
        <h3>Time:{event.time}</h3>
        <h4>Atendees:{event.user_events.length}</h4>
        {attending ? (null):(
          <button  className='EventCardButton' onClick={attendEvent}>Attend</button>
        )}
        </div>
        <main>
        
        <MessageList message={event.comments}/>
        
        <NewMessage eventid = {event.id} getEvent ={getEvent}/>
    
        </main>
        </>
    )
}

export default EventPage