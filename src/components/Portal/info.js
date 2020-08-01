import React,{useContext,useState,useEffect} from 'react';
import clsx from 'clsx';
import {auth, db} from '../../utils/firebase'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createUserProfileDocument} from "../../utils/firebase";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import{ UserContext }from '../../providers/UserProvider'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ResponsiveBar } from '@nivo/bar';
import CardHeader from '@material-ui/core/CardHeader';
import {useParams} from '@reach/router'
import './styles.css';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },

  new: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '10%',
      marginRight: '10%',
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

 button2:{
  // marginBottom: '5%',
  color: 'white',
  fontSize: '1.4rem',
  // marginLeft: '2%', 
  width: '100%', 
  backgroundColor: '#f9cbd3'
 },
 recent:{
    fontSize: '3rem',
    lineHeight: 1.5,
    letterSpacing: '.025em',
    fontWeight: 500,
    marginBottom: '1%',
    fontWeight: 500,
    paddingTop: '2%',
   },
   table: {
    minWidth: 650,
    background: 'none',
    boxShadow: 'none'
  },
  cellheading: {
    fontSize: '1.5rem'
  },
  cellContent: {
      fontSize: '1.2rem'
  },
 
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
 align: {
  [theme.breakpoints.up('sm')]: {
    marginLeft: '25%',
  }
 },
  text:{
    marginTop: '1%',
    marginBottom: '1%'
  },
  field:{
    marginBottom: '3%',
    color: 'black',
    fontSize: '1.25rem',
    marginLeft: '5%'
  },
  heading :{
    marginBottom: '5%', 
    textAlign:'center'
  },
  criteria: {
    display: 'inline-block',
    color: 'black',
    fontWeight: 700
  }

}));


  
/*******************************************************************************************************************************************/

 




export default function Info() {
  const classes = useStyles();
  const params=useParams();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useContext(UserContext);
  const [scroll, setScroll] = React.useState('paper');
  const [loading,setLoading]=useState(true)
  const [details,setDetails]=useState({
    opp:null,
    org:null,
  })
  const logout = async () => {
  await auth.signOut();
  setUser({ data: null, loading: false });
};
useEffect(() => {
  const run=async ()=>{
    const opp=await db.collection('opportunities').doc(`${params.oppId}`).get()
    console.log(opp.data());
    const org=await opp.data().creatorRef.get();
    console.log(org.data())
    setDetails({
      opp,
      org,
    })
    setLoading(false)
  }
  run()
}, [])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const shadowStyles = useOverShadowStyles();
  const{opp,org}=details

  const renderCard=()=>{
    if(opp.data().Manufacturing===true)
    {
      return(<>
         <Grid item xs={12} sm={6}>
                              <Card className={shadowStyles.root} style={{minWidth: 275}}>
                              <CardContent variant= "outlined">
                                 {/*Opportunity Info.*/}
      
                                  <Typography variant="h3" component="h2" className= {classes.heading} style={{fontSize: '2rem', marginBottom: '3%'}}>
                                      Swachh Pari Opportunity details 
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                      <p className={classes.criteria}>Approx. Cost per Pad:</p>  Rs. 20
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                     <p className={classes.criteria}>Requirements of the process: </p> lorem ipsum si dolot et amet
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                    <p className={classes.criteria}>No. of pads per day : </p> 250
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                    <p className={classes.criteria}>Opportunity Type : </p> Part Time
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                    <p className={classes.criteria}>Training duration : </p> 1 month
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field} style={{marginBottom : 0}}>
                                    <p className={classes.criteria}>No. of Women required </p>:  5
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                  <Button variant="contained" size="large" className={classes.button2}>
                  Apply For Opportunity
                 </Button>
                 </CardActions>
                              </Card>
                           </Grid>
      
      </>)
    }
    else if(opp.data().Distribution===true)
    {
      return(<>  <Grid item xs={12} sm={6}>
        <Card className={shadowStyles.root} style={{minWidth: 275, height: '100%'}}>
        <CardContent variant= "outlined">
           {/*Opportunity Info.*/}

            <Typography variant="h3" component="h2" className= {classes.heading}>
                Saathi Pad Opportunity details 
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
               <p className={classes.criteria}>Salary/Benefits Offered: </p> lorem ipsum si dolot et amet
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
              <p className={classes.criteria}>No. of pads distributed per day : </p> 200
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
              <p className={classes.criteria}>Opportunity Type : </p> Full Time Time
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field} style={{marginBottom:0}}>
              <p className={classes.criteria}>Training duration : </p> 1 month
            </Typography>
            </CardContent>
            <CardActions>
<Button variant="contained" size="large" className={classes.button2}>
Apply For Opportunity
</Button>
</CardActions>
        </Card>
     </Grid>
  
</>)

    }
    else{
      return(<>   <Grid item xs={12} sm={6}>
        <Card className={shadowStyles.root} style={{minWidth: 275}}>
        <CardContent variant= "outlined">
           {/*Opportunity Info.*/}

            <Typography variant="h3" component="h2" className= {classes.heading}>
                Boondh Opportunity details 
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
               <p className={classes.criteria}>Benefits Offered: </p> lorem ipsum si dolot et amet
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
              <p className={classes.criteria}>Expected Audience Reach: </p> 200
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
              <p className={classes.criteria}>Opportunity Type : </p> Full Time Time
            </Typography>
            <Typography className={classes.pos} color="textSecondary" className= {classes.field} style={{marginBottom: 0}}>
              <p className={classes.criteria}>Method Of Campaign : </p> lorem ipsum si dolot et amet
            </Typography>
            </CardContent>
            <CardActions>
            <Button variant="contained" size="large" className={classes.button2}>
Apply For Opportunity
</Button>
</CardActions>
        </Card>
     </Grid>
</>)

    }
  }

  if(loading)
  {
    return <h1>Loading</h1>
  }
  else{
    return (
      <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{backgroundColor:'#f9cbd3', width:'100%'}}>
              <Toolbar className={classes.toolbar}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  Dashboard
                </Typography>
                <Button onClick={logout} >LogOut</Button>
              </Toolbar>
            </AppBar>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                  <h1 style= {{fontSize:'3.5rem',paddingBottom : '1%' ,color: '#000000',textAlign: 'center'}}>Opportunity Insights</h1>
                  <p style={{textAlign: 'center', fontSize: '1.5rem', marginBottom: '3%'}}>A place where leading employers are already looking for your talent and experience.</p>
                  {/* <Carousel/> */}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                              <Card className={shadowStyles.root} style={{minWidth: 275, height: '100%'}}>
                              <CardContent variant= "outlined">
                                 {/*Organisation Info.*/}
      
                                  <Typography variant="h3" component="h2" className= {classes.heading}>
                                      Swacch Pari       {/*Name*/}
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                  <p className={classes.criteria}> Organisation Description : </p>lorem ipsum si dolot et amet   {/*Description*/}
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className={classes.field}>
                                  <p className={classes.criteria}>Location : </p>B-228, GK-1, New Delhi (or distance)   {/*Location*/}
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                      <p className={classes.criteria}>Contact Info :</p> 9818942238
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                     <p className={classes.criteria}>No. of Women currently employed: </p> 250
                                  </Typography>
                                  <Typography className={classes.pos} color="textSecondary" className= {classes.field}>
                                    <p className={classes.criteria}>Website Link : </p> <a href= "#" > www.swacchta.com</a>
                                  </Typography>
                                  </CardContent>
                                  <CardActions>
                 </CardActions>
                              </Card>
                           </Grid>
                  {renderCard()}                   
                </Grid>
              </Container>
            </main>
          </div>
        );

  }
 
}
