import { useState } from "react";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";
import { Link, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function MyEventCard({ name, location, id, time }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [onLogin, user, check_session] = useOutletContext();

  
  const validationSchema = yup.object().shape({
    eventName: yup.string().required("Event name is required"),
    location: yup.string().required("Location is required"),
    date: yup.string().required("Date is required"),
  });

  
  const formik = useFormik({
    initialValues: {
      eventName: name,
      location: location,
      date: time,
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      setErrors([]);

      fetch(`https://phase-4-final-project-ttow.onrender.com/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.eventName,
          location: values.location,
          time: values.date,
        }),
      })
        .then((r) => r.json())
        .then(() => {
          setIsEditing(false);
          check_session();
        })
        .catch((err) => setErrors([err.message]))
        .finally(() => setIsLoading(false));
    },
  });

  function handleDelete() {
    fetch(`https://phase-4-final-project-ttow.onrender.com/events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => check_session());
  }

  return (
    <div style={{ width: "46%", backgroundColor: "#35393d", borderRadius: "10px" }}>
      <h1>Event Details:</h1>
      <h2>{name}</h2>
      <h6>{location}</h6>
      <h6>{time}</h6>
      <Link to={`/events/${id}`}>
        <button className="EventCardButton" style={{ marginBottom: "10px" }}>
          View More Details
        </button>
      </Link>
      <br />
      {isEditing ? (
        <button className="EventCardButton" style={{ marginRight: "10px" }} onClick={() => setIsEditing(!isEditing)}>
          Cancel
        </button>
      ) : (
        <button className="EventCardButton" style={{ marginRight: "10px" }} onClick={() => setIsEditing(!isEditing)}>
          Edit
        </button>
      )}
      <button className="EventCardButton" onClick={handleDelete}>
        Delete
      </button>

      {isEditing && (
        <Wrapper>
          <form onSubmit={formik.handleSubmit}>
            <FormField>
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                type="text"
                id="eventName"
                name="eventName"
                autoComplete="off"
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.eventName && formik.errors.eventName && <Error>{formik.errors.eventName}</Error>}
            </FormField>

            <FormField>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                autoComplete="off"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location && <Error>{formik.errors.location}</Error>}
            </FormField>

            <FormField>
              <Label htmlFor="date">Date</Label>
              <Input
                type="datetime-local"
                id="date"
                name="date"
                autoComplete="off"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date && <Error>{formik.errors.date}</Error>}
            </FormField>

            <FormField>
              <Button variant="fill" color="primary" type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </FormField>

            {errors.length > 0 && (
              <FormField>
                {errors.map((err) => (
                  <Error key={err}>{err}</Error>
                ))}
              </FormField>
            )}
          </form>
        </Wrapper>
      )}
    </div>
  );
}

export default MyEventCard;

const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;
