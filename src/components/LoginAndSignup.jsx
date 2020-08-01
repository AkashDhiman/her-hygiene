import React, { useState, useEffect } from "react";
import SignInNew from "./SignInNew";
import SignUp1 from "./SignUp1";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "../homepage-style.css";
import "../hero-slider.css";
import Dash from './landing/Dash'

const useStyles = makeStyles((theme) => ({
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: "auto auto",
  },
}));
const LoginAndSignup = () => {
  const classes = useStyles();
  const [loginForm, setLoginForm] = useState(false);
  const [homePage, setHomePage] = useState(true);

  const [buttonText, setButtonText] = useState("Signup for new Email Account");
  useEffect(() => {
    loginForm
      ? setButtonText("Signup for new Email Account")
      : setButtonText("Click here to Login instead");
  }, [loginForm]);

  const toggleHandler=()=>{
    if(homePage==true) setHomePage(false)
    else setHomePage(true)
  }

  return (
    <>
    {homePage?<Dash toggleHandler={toggleHandler} />:<>
    <Button onClick={toggleHandler}>Back To Home Page</Button>
      {loginForm ? <SignInNew /> : <SignUp1 />}
      <Button
        className={classes.button}
        onClick={() => setLoginForm(!loginForm)}
        variant="text"
        color="primary"
      >
        {buttonText}
      </Button>
    
    </>}
    
    </>
  );
};

export default LoginAndSignup;
