import React, { useState } from "react";
import { Button, Error, Input, FormField, Label} from "../styles";
import { useFormik } from "formik";
import * as yup from "yup";

function SignUpForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 const formSchema = yup.object().shape({
  username: yup.string().required("username is reuired").min(5),
  password: yup.string().required("password is required and at least 5 characters").min(6),
 });

 const formik = useFormik({
  initialValues: {
    username: "", 
    password: "",
  },
  validationSchema: formSchema,
  onSubmit: (values) => {
    setErrors([]);
    setIsLoading(true);
    console.log(values); 

    fetch("https://phase-4-final-project-ttow.onrender.com/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), 
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((user) => onLogin(user));
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      });
  },
});


  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
            type="text"
            id="username"
            name="username" 
            autoComplete="off"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
          />
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password" 
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
          autoComplete="current-password"
        />
      </FormField>

        <FormField>
        <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
      </FormField>
      <FormField>
        {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))}
      </FormField>
      <FormField>
      {formik.errors.username && <p style={{ color: "red" }}>{formik.errors.username}</p>}
      {formik.errors.password && <p style={{ color: "red" }}>{formik.errors.password}</p>}
      </FormField>
    </form>
  );
}

export default SignUpForm;
