import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import creativeWoman from './creative-woman.svg'
import natureOnScreen from './nature_on_screen.svg'
import Grid from '@material-ui/core/Grid'
import "./styles.css";
import { format } from 'date-fns';
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  depositContext: {
    flex: 1,
  },
  image:{
    height: '75px',
    marginTop: '2%',
    [breakpoints.up('md')]: {
      height: '200px',
      marginTop: 0
    }

  }
}));

export default function Welcome({user}) {
  const classes = useStyles();
  return (
    <React.Fragment>
              <Grid container>
<Grid item xs={12} lg={6}>  <Title>Welcome</Title>
      <Typography component="p" variant="h4">
         {user.data.name}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        account created on {" "}
        { format (user.data.createdAt.toDate(),"dd MMMM yyyy")}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View Profile
        </Link>

      </div>
      </Grid>
<Grid item xs={false}lg={6}><img className= {classes.image}  src={natureOnScreen}/></Grid>

              

    
     
      </Grid>
    </React.Fragment>
  );
}
