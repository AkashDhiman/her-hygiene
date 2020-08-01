import firebase from "firebase/app";
import React, { useState, useContext } from "react";
import { useSwipeable } from "react-swipeable";
import { UserContext } from "../providers/UserProvider";
import {
  addPeriodRegister,
  getUserLogDocument,
  updateCurrentUseDocument,
} from "../utils/firebase";
import formatDistance from "date-fns/formatDistance";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "@reach/router";
import Bar from "./Bar";
import pad from "../img/pad.jpg";
import axios from "axios";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
import Container from '@material-ui/core/Container';

import {
  addDays,
  eachDayOfInterval,
  startOfWeek,
  getDay,
  subWeeks,
  addWeeks,
  compareAsc,
  subDays,
  format,
  endOfWeek,
  differenceInDays,
  isSameDay,
  toDate,
  differenceInCalendarMonths,
} from "date-fns";
import { Box, TextField } from "@material-ui/core";
import img from '../img/icon.svg'

const Registration = ({ user, handleRegister }) => {
    const [fields, setFields] = useState({
      cycleTotal: 0,
      age: 0,
      weight: 0,
      cycleLength: 0,
      height: 0,
      lastDate: Date.now(),
      // lastStart:new Date(),
      // lastEnd:new Date()
    });
    const [placeHolderText, setPlaceHolderText] = useState(
      "What is your height? (in cms)"
    );
    const [step, setStep] = useState(1);
    const handleChange = (event) => {
      const { name, value } = event.target;
      const date = new Date(value);
      console.log(fields);
      if (name === "lastDate") {
        setFields({ ...fields, [name]: date });
      } else {
        setFields({ ...fields, [name]: value });
      }
    };
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(fields);
  
      const { cycleTotal, age, weight, cycleLength, height, lastDate } = fields;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const send = {
        id: user.data.uid,
      };
      await addPeriodRegister(user, {
        cycleTotal,
        age,
        weight,
        cycleLength,
        height,
      });
  
      const res = await axios.post("http://localhost:5000/predict", send, config);
      console.log(res);
      const predictedStartDate = addDays(lastDate, res.data.t_len);
      const predictedEndDate = addDays(predictedStartDate, res.data.p_len);
      console.log(predictedStartDate, predictedEndDate);
      await updateCurrentUseDocument(user, {
        predictedStartDate,
        predictedEndDate,
      });
      // CREATE FIRST LOG ELSE APP BREAKS
  
      handleRegister(predictedStartDate, predictedEndDate);
    };
    const changePlaceHolder = (currstep) => {
      if (currstep === 1) setPlaceHolderText("What is your height? (in cms)");
      if (currstep === 2) setPlaceHolderText("What is your Weight? (in kg) ");
      if (currstep === 3)
        setPlaceHolderText("What is your average period cycle length? (in days)");
      if (currstep === 4) setPlaceHolderText("What is your age?");
      if (currstep === 5)
        setPlaceHolderText("What is your average total cycle ?(in days)");
      if (currstep === 6)
        setPlaceHolderText("Please log your first day of last period");
      if (currstep === 7)
        setPlaceHolderText("Please Submit with the following details");
    };
    const goPrev = () => {
      changePlaceHolder(step - 1);
  
      setStep(step - 1);
    };
    const goNext = () => {
      changePlaceHolder(step + 1);
      setStep(step + 1);
    };

    const useStyles = makeStyles({
       form:{

        width: '100%',
        height: '100%',
        display: 'flex',
        boxAlign: 'center',
        alignItems: 'center',
        BoxPack: 'center',
       justifyContent: 'center',
       backgroundColor: '#f8c8d4',
       },
       heading:{
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '5% 0 5%',
        color: '#ef5579',
        textAlign: "center",
       },
       question:{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        margin: '5% 0 5%',
    },
    image: {
        height: '50px',
    },
    input: {
        marginTop: '5%',
        width: '100%',
        color: 'rgb(58, 58, 58)',
        fontSize: '1rem',
        marginBottom: '5%',
        padding: '20px 15px',
        background: 'rgb(255, 255, 255)',
        borderRadius: '5px',
        outline: 'none',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(214, 214, 214)',
    },
    button :{
        color: 'rgb(255, 255, 255)',
    fontWeight: '700',
    lineHeight: '32px',
    textTransform: 'uppercase',
    outline: 'none',
    backgroundColor : 'black',
    borderWidth: '0px',
    borderStyle: 'initial',
    borderColor: 'initial',
    borderImage: 'initial',
    borderRadius: '5px',
    padding: '0px 16px',
    transition: 'all 0.5s ease-in-out 0s',
    marginBottom: '5%',
    }
      });

      const classes = useStyles();
    return (
      <>
      {/* <div> */}
      <section className={classes.form}>
        <form
          className="login-box"
          style={{width: '400px', height: '400px', backgroundColor: "#ffffff"}}
          onKeyPress={(event) => {
            if (event.which === 13 /* Enter */) {
              event.preventDefault();
            }
          }}
          onSubmit={handleSubmit}
        >

                <img className= {classes.image} height={100} src={img}/>
                <h1 className= {classes.heading}>Her Hygiene</h1>
            
            
          <h2 className={classes.question}>{placeHolderText}</h2>
  
          {step === 1 ? (
            <input
              type="number"
              name="height"
              placeholder="Height"
              value={fields.height}
              onChange={handleChange}
              className= {classes.input}
            />
          ) : (
            <></>
          )}
  
          {step === 2 ? (
            <input
              type="number"
              name="weight"
              placeholder="weight"
              value={fields.weight}
              onChange={handleChange}
              className= {classes.input}
            />
          ) : (
            <></>
          )}
          {step === 3 ? (
            <input
              type="number"
              name="cycleLength"
              placeholder="cycle Length"
              value={fields.cycleLength}
              onChange={handleChange}
              className= {classes.input}
            />
          ) : (
            <></>
          )}
          {step === 4 ? (
            <input
              name="age"
              placeholder="age"
              value={fields.age}
              onChange={handleChange}
              className= {classes.input}
            />
          ) : (
            <></>
          )}
  
          {step === 5 ? (
            <input
              name="cycleTotal"
              placeholder="cycle Total"
              value={fields.cycleTotal}
              onChange={handleChange}
              className={classes.input}
            />
          ) : (
            <></>
          )}
          {step === 6 ? (
            <input className={classes.input} name="lastDate" type="date" onChange={handleChange} />
          ) : (
            <></>
          )}
          {step === 7 ? <input type="submit" value="Signup" /> : <></>}
          {step > 1 ? <button onClick={goPrev} className={classes.button}>Prev</button> : <></>}
        {step < 7 ? <button className={classes.button} onClick={goNext}>Next</button> : <></>}
        {/* <text style={{marginTop: '7%'}}>{step}</text>  */}
        </form>
        </section>
        {/* </div> */}
        
      </>
    );
  };

  export default Registration;