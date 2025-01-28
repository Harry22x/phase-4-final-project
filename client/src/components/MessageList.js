import Message from "./Message.js"

function MessageList({message}){

    return(<>
    <h1>Comments</h1>
    {message.map(data=>(<Message message={data} key={data.id}/>))}
    </>
    )
}
export default MessageList