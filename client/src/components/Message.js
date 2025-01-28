import React, { useState } from "react";

function Message({message}){
    const { id, username, body, created_at: createdAt } = message
    const timestamp = new Date(createdAt).toLocaleTimeString();
    console.log(body)
    return(
        <>
        <li>
              <span className="user">{username}</span>
              <span className="time">{timestamp}</span>
              <p>{body}</p>
              </li>
        </>
    )
}

export default Message