import React, { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";
import { useOutletContext,useNavigate } from "react-router-dom";
function CreateEvent(){
  const navigate = useNavigate();
    const[eventName,setEventName] = useState("")
    const[location,setLocation] = useState("")
    const [date,setDate] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [eventData,setEventData] = useState('')
    let [onLogin,user,check_session] = useOutletContext();

    function handleSubmit(e) {
      e.preventDefault();
      setIsLoading(true);
      setErrors([]);
  
      fetch('https://phase-4-final-project-ttow.onrender.com/events', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: eventName,
              location: location,
              time: date
          })
      })
      .then(r => {
          if (!r.ok) {
              return r.json().then(err => {
                  throw new Error(err.error || "Failed to create event");
              });
          }
          return r.json();
      })
      .then(event => {
          setEventData(event); 
          
          return fetch('https://phase-4-final-project-ttow.onrender.com/user_events', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                  event_id: event.id,  
                  user_id: user.id,
                  role: 'Organizor'
              }),
          }).then(() => event);  
      })
      .then(event => {
          check_session();  
          navigate(`/events/${event.id}`); 
      })
      .catch(error => {
          console.error("Error:", error);
          setErrors([error.message]);
      })
      .finally(() => setIsLoading(false));
  }
  
   return(<>
   <Wrapper>
    <Logo>Create Event</Logo>
    <form onSubmit={handleSubmit}>
     
     <Label htmlFor="eventName">Event Name</Label>
     <Input
       type="text"
       id="eventName"
       autoComplete="off"
       value={eventName}
       onChange={(e) => setEventName(e.target.value)}
     />
  
   <FormField>
     <Label htmlFor="location">location</Label>
     <Input
       type="text"
       id="location"
       autoComplete="off"
       value={location}
       onChange={(e) => setLocation(e.target.value)}
     />
   </FormField>
   <FormField>
     <Label htmlFor="date">location</Label>
     <Input
       type="datetime-local"
       id="date"
       autoComplete="off"
       value={date}
       onChange={(e) => setDate(e.target.value)}
     />
   </FormField>
   <FormField>
     <Button variant="fill" color="primary" type="submit">
       {isLoading ? "Loading..." : "Submit"}
     </Button>
   </FormField>
   <FormField>
     {errors.map((err) => (
       <Error key={err}>{err}</Error>
     ))}
   </FormField>
 </form>
 </Wrapper>
   </>)
}

export default CreateEvent

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: white;
  margin: 8px 0 16px;
`;