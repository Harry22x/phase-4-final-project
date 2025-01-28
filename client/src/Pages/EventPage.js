import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessageList from "../components/MessageList";
import NewMessage from "../components/NewMessage";
import { Link, useOutletContext,Navigate,useNavigate } from "react-router-dom";


function EventPage(){
  const navigate = useNavigate();

  let [onLogin,user] = useOutletContext();
  if(!user){
      navigate('/login')
  }
    
    const [{ data: event, error, status }, setEvent] = useState({
        data: null,
        error: null,
        status: "pending",
      });
      const { id } = useParams();
    
      function getComments(){
        fetch(`/events/${id}`).then((r) => {
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
      useEffect(getComments, [id]);

      if (status === "pending") return <h1>Loading...</h1>;
      if (status === "rejected") return <h1>Error: {error.error}</h1>;
    return(
        <>
        <div style={{textAlign:"center"}}>
        <h1>{event.name}</h1>
        <h2>Location:{event.location}</h2>
        <h3>Time:{event.time}</h3>
        <h4>Atendees:{event.user_events.length}</h4>
        <button>Attend</button>
        </div>
        <main>
        
        <MessageList message={event.comments}/>
        <NewMessage eventid = {event.id} getComments ={getComments}/>
        </main>
        </>
    )
}

export default EventPage