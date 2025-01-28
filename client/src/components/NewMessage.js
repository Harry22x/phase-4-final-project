import React, { useState } from "react";
import { Link, useOutletContext,Navigate,useNavigate } from "react-router-dom";
function NewMessage({ currentUser, getEvent,eventid }) {
  const [body, setBody] = useState("");


  let [onLogin,user] = useOutletContext();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        body: body,
        event_id: eventid,
      }),
    })
      .then((r) => r.json())
      .then((newMessage) => {
        getEvent();
        setBody("");
      });
  }

  return (
    <form className="new-message" onSubmit={handleSubmit}>
      <input
        type="text"
        name="body"
        autoComplete="off"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default NewMessage;