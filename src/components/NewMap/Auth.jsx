import React,{useState} from 'react'
import Webcam from "react-webcam";
import { Link } from '@reach/router';
import { Button } from '@material-ui/core';
import Map from './Map'
import axios from 'axios'
import CircleLoader from 'react-spinners/CircleLoader'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
 
 const Auth = () => {
     const [auth,setAuth]=useState(0);

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        async () => {
            setAuth(1)
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc)
            const config = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const send = {
              img: imageSrc,
            };
            const res = await axios.post("https://herhygienefg.herokuapp.com/detect_face", send, config);
            console.log(res)
            if(res.data.gender==="1")
            {
              setAuth(2)
            }
            else{
              setAuth(-1)
            }
            // window.location.reload()
            // setInterval(()=>{
               
            //     if(1) setAuth(2)
            //     else setAuth(-1)
            // },2000)
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
            style={{marginLeft: '35%'}}
            videoConstraints={videoConstraints} />
          <button onClick={capture} style={{border: 'none', padding: '10px 20px',backgroundColor: '#f50057',color: 'white', marginLeft : '-15%'}}>Capture photo</button>
          <h1 style={{marginLeft: '42%', marginTop: '3%'}}>Or</h1>
          <h1 style={{marginLeft: '35%'}}>Enter your access token here</h1>
        </>
      );
     }
     else if(auth==1)
     {
         return<> <h1 style={{textAlign : 'center'}}>Authenticating</h1>
         <CircleLoader css={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}} size="400px"color="pink"/>;
         </>
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

