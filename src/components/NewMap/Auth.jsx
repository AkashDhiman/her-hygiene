import React,{useState} from 'react'
import Webcam from "react-webcam";
import { Link } from '@reach/router';
import { Button } from '@material-ui/core';
import Map from './Map'
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };
 
 const Auth = () => {
     const [auth,setAuth]=useState(0);

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            setAuth(1)
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)
            
            setInterval(()=>{
               
                if(1) setAuth(2)
                else setAuth(-1)
            },2000)
        //   if(1) setAuth(2)
        //   else setAuth(-1)
        },
        [webcamRef]
      );
   
     
     if(auth==0)
     {
      return (
        <>
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            videoConstraints={videoConstraints} />
          <button onClick={capture}>Capture photo</button>
          <h1>Or</h1>
          <h1>Enter your access token here</h1>
        </>
      );
     }
     else if(auth==1)
     {
         return <h1>Authenticating</h1>
     }
     else if(auth===2)
     {
         return <Map/>
     }
     else
     {
         return(<>
         <h1>You have failed authentication,Please try again or go back to home page</h1>
         <Button component={Link} to='/' >Go to Dashboard</Button>
         <Button onClick={()=>{setAuth(0)}} >Go to Dashboard</Button>
         </>)
         
     }
}

export default Auth

