import Welcome from "../dash/Welcome";
import Periods from "../dash/Periods";
import Chart from "./LineChart";
import Deposits from "./DepositsZ";
import { UserContext } from "../../providers/UserProvider";
import React, { useContext } from "react";
import clsx from "clsx";
import { auth } from "../../utils/firebase";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Cardy from "./cards";
import Button from "@material-ui/core/Button";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 260,
  },
  fixedHeight2: {
    height: 220,
  },

  Cardy: {
    width: "100%",
    // marginTop: '5%',
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    maxWidth: "100%",
    // marginLeft: '5%',
    // marginRight: 'auto',
    overflow: "initial",
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    display: "flex",
    flexDirection: "column",
    // alignItems: 'center',
    color: "#ffffff",
  },
  ugh: {
    maxWidth: 500,
    height: 170,
  },
  Button: {
    height: 100,
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    color: "#ffffff",
    margin: 10,
    fontSize: 30,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [user, setUser] = useContext(UserContext);

  const logout = async () => {
    await auth.signOut();
    setUser({ data: null, loading: false });
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
  const cardyboi = clsx(classes.paper, classes.Cardy);
  return (
    <>
      <CssBaseline />

      {/* <main className={classes.content}> */}

      {/* <Container maxWidth="lg" className={classes.container}> */}
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Welcome user={user} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {/* <Paper className={fixedHeightPaper} elevation={3} style= {{backgroundColor: '#ef5579'}}> */}
          <Deposits />
          {/* </Paper> */}
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Periods />
          </Paper>
        </Grid>
        <Grid item lg={9}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item lg={3}>
          <Paper className={fixedHeightPaper} elevation={3}>
            <Button className={classes.Button}>Retrain</Button>
            <Button className={classes.Button}>Caliberate</Button>
          </Paper>
        </Grid>
        {/* Recent Deposits */}

        {/* Do you knowww */}
        <Grid item xs="12">
          <Paper className={fixedHeightPaper} elevation={3}>
            <Grid container spacing="2" xs="12">
              <Grid item xs={12} lg={4}>
                <Paper elevation={3} className={fixedHeightPaper2}>
                  <Paper className={cardyboi}>
                    <Typography variant="h1">Fact 1</Typography>
                  </Paper>
                  <Typography variant="h4">
                    {" "}
                    A rare period disorder can cause bleeding of the eyes.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Paper elevation={3} className={fixedHeightPaper2}>
                  <Paper className={cardyboi}>
                    <Typography variant="h1">Fact 2</Typography>
                  </Paper>
                  <Typography variant="h4">
                    {" "}
                    Getting your period can worsen asthma symptoms.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Paper elevation={3} className={fixedHeightPaper2}>
                  <Paper className={cardyboi}>
                    <Typography variant="h1">Fact 3</Typography>
                  </Paper>
                  <Typography variant="h4">
                    {" "}
                    Sleeping with a nightlight can help regulate your cycle.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {/* <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper className={cardyboi}>
              <Typography variant="h1">Fact 1</Typography>
              <Typography variant="h4">
                {" "}
                A rare period disorder can cause bleeding of the eyes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={cardyboi}>
              <Typography variant="h1">Fact 1</Typography>
              <Typography variant="h4">
                {" "}
                A rare period disorder can cause bleeding of the eyes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={cardyboi}>
              <Typography variant="h1">Fact 1</Typography>
              <Typography variant="h4">
                {" "}
                A rare period disorder can cause bleeding of the eyes.
              </Typography>
            </Paper>
          </Grid>
        </Grid> */}

        {/* <Grid item xs={12} md={12} lg={9}>
              <BlogCardDemo2/>
            </Grid> */}

        <Grid item xs={12}>
          {/* <h1 style= {{backgroundColor:"#ef5779", padding : '2%' ,color: '#ffffff'}}>Your retraining status</h1> */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Regular/> */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* <Exercise/> */}
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Mens1/>
          </Grid> */}
        {/* <Grid item xs={12} md={6}>
          <Mens2/>
          </Grid> */}
      </Grid>

      {/* </Container> */}
      {/* </main> */}
    </>
  );
}
