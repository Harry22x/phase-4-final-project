import EventCard from "./Eventcard"
import "./LoadingAnimation.css"

function Event({eventData}){
    
    if (eventData.length === 0) {
        return (
          <div>
        
            <div className="loader">
          <div className="spinner"></div>
        </div>
          </div>
        );
      }


    return(
        <div>
            <h1 style={{textAlign:'center'}}>Events:</h1>
            <div style={{ display: "flex", gap: "100px", flexWrap: "wrap", textAlign: "left" }} >
                
            
            {eventData.map(Data =>(
                <EventCard 
                key = {Data.id}
                name={Data.name}
                location ={Data.location} 
                id = {Data.id}/>
            ))}
            
            </div>
           
        </div>
    )
}


export default Event