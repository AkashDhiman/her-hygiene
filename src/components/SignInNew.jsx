import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Image from "./landing/components/elements/Image";

import { signInWithGoogle, auth } from "../utils/firebase";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import SaveIcon from "@material-ui/icons/Save";
import Google from "../utils/sign-in-with-google.png";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 50,
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
  },
}));

export default function SignInNew() {
  const classes = useStyles();
  const [fields, setFields] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth.signInWithEmailAndPassword(fields.email, fields.password);
    setFields({
      email: "",
      password: "",
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Image
          // className={classes.avatar}
          src={require("./landing/assets/images/logo.svg")}
          alt="Open"
          width={32}
          height={32}
          style={{
            display: "inline",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
          }}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={fields.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={handleChange}
            value={fields.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}

          {/* <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            // startIcon={<Google />}
          >
            Sign in with Google 
          </Button> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            className={classes.button}
          >
            <strong style={{ fontSize: "1.2em" }}>Sign In</strong>
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
          <Grid>
            <p onClick={() => signInWithGoogle()}>
              <button
                className="icon"
                style={{ margin: "10px", display: "inline" }}
              ></button>
              Use Gmail to signIn instead{" "}
            </p>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}

//   import React, { useState } from "react";
// import { signInWithGoogle, auth } from "../utils/firebase";

// const Login = () => {
//   const [fields, setFields] = useState({ email: "", password: "" });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFields({ ...fields, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     await auth.signInWithEmailAndPassword(fields.email, fields.password);
//     setFields({
//       email: "",
//       password: "",
//     });
//   };

//   return (
//     <form className="login-box" onSubmit={handleSubmit}>
//       <h2 className="login-heading">Please login</h2>
//       <input
//         type="email"
//         name="email"
//         placeholder="Enter Email"
//         value={fields.email}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={fields.password}
//         onChange={handleChange}
//       />
//       <input type="submit" value="Login" />
//       <span id="or">or</span>
//       <button
//         className="icon"
//         onClick={() => {
//           signInWithGoogle();
//         }}
//       ></button>
//     </form>
//   );
// };

// export default Login;
