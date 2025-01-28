import Message from "./Message.js"

function MessageList({message}){

    return(<>
    <h1 style={{backgroundColor:"#212529"}}>Comments</h1>
    <div className="list">
        <ul className="messageul">
    {message.map(data=>(<Message message={data} key={data.id}/>))}
    </ul>
    </div>
    </>
    )
}
export default MessageList