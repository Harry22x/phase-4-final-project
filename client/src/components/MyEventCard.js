import { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";
import { Link, useOutletContext} from "react-router-dom";

function MyEventCard({name,location,id,time}){

const [isEditing,setIsEditing] = useState(false)
const[eventName,setEventName] = useState(name)
const[eventlocation,setLocation] = useState(location)
const [date,setDate] = useState(time)
const [errors, setErrors] = useState([]);
const [isLoading, setIsLoading] = useState(false);
let [onLogin,user,check_session] = useOutletContext();


    function handleSubmit(e){
        e.preventDefault();
        fetch(`https://phase-4-final-project-ttow.onrender.com/events/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: eventName,
                location: eventlocation,
                time: date
            })
        })
        .then(r=>r.json())
        .then(()=>setIsEditing(false))
        .then(()=> check_session())
    }

    function handleDelete(){

        fetch(`https://phase-4-final-project-ttow.onrender.com/events/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(()=> check_session())
    }

    return(
        <div style={{ width:"46%", backgroundColor:"#35393d", borderRadius:"10px"}}>
            <h1>Event Details:</h1>
            <h2>{name}</h2>
            <h6>{location}</h6>
            <h6>{time}</h6>
            <Link to={`/events/${id}`}>
            <button className='EventCardButton' style={{marginBottom:"10px"}}>View More Details</button>
            </Link><br></br>
            {isEditing ? (
                 <button className="EventCardButton" style={{marginRight:"10px"}} onClick={()=>setIsEditing(!isEditing)}>Cancel</button>
            ):(
                <button className="EventCardButton" style={{marginRight:"10px"}} onClick={()=>setIsEditing(!isEditing)}>Edit</button>
            )}

            <button className="EventCardButton" onClick={handleDelete}>Delete</button>
            {isEditing ? (
  <Wrapper>

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
     value={eventlocation}
     onChange={(e) => setLocation(e.target.value)}
   />
 </FormField>
 <FormField>
   <Label htmlFor="date">Date</Label>
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

            ):(null)}
        </div>
    )
}

export default MyEventCard

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;