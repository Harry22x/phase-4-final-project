import LoginForm from "../components/LoginForm"
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../styles";
import SignUpForm from "../components/SignUpForm";
import { Link, useOutletContext,Navigate,useNavigate } from "react-router-dom";

function Login(){
    const [showLogin, setShowLogin] = useState(true)
    const navigate = useNavigate();

    let [onLogin,user] = useOutletContext();
    if(user){
        navigate('/')
    }
    return(
    <Wrapper>
      <Logo>Login</Logo>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <Divider />
          <p>
            Don't have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </Button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <Divider />
          <p>
            Already have an account? &nbsp;
            <Button color="secondary" onClick={() => setShowLogin(true)}>
              Log In
            </Button>
          </p>
        </>
      )}
    </Wrapper>
    )
}

const Logo = styled.h1`
  font-family: "Permanent Marker", cursive;
  font-size: 3rem;
  color: deeppink;
  margin: 8px 0 16px;
`;


const Wrapper = styled.section`
  max-width: 500px;
  margin: 40px auto;
  padding: 16px;
`;

const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #ccc;
  margin: 16px 0;
`;

export default Login