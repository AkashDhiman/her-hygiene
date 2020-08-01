import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useLeaflet,
} from "react-leaflet";
import { auth } from "../../utils/firebase";
import { Link } from "@reach/router";

import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { encode, neighbors } from "ngeohash";
import { db } from "../../utils/firebase";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import MenuIcon from "@material-ui/icons/Menu";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Header from "../originals/Header";
import { othersIcon, userIcon } from "../icon";
import { UserContext } from "../../providers/UserProvider";
import { usePersistedState } from "./usePersistedState";
// import "./styles2.css";

import logout from "./logout.svg";
import DateRangeIcon from "@material-ui/icons/DateRange";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import LocationSearchingIcon from "@material-ui/icons/LocationSearching";
// import CancelHelp from "./cancelHelp";
// import CancelRequest from "./cancelrequest";
import Menu2 from "./help2";

import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

import { useSpring, a, config } from "react-spring";
import { useDrag } from "react-use-gesture";

const items = ["save item", "open item", "share item", "delete item", "cancel"];
const height = items.length * 60 + 80;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    display: "none",
  },
  menuButton: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    position: "fixed",
    zIndex: "100",
    top: "40px",
    right: "40px",
    height: "48px",
    width: "48px",
    borderRadius: "24px",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

let dummyRequests = [
  {
    id: 1,
    requester: {
      id: 1,
      location: [28.7040572, 77.1224902],
      detail: {
        name: "Jane Doe",
        msg: "lorem ipsum doler set",
      },
    },
    status: "active",
  },
  {
    id: 2,
    requester: {
      id: 2,
      location: [28.7040582, 77.1124902],
      detail: {
        name: "Jane Doe",
        msg: "lorem ipsum doler set",
      },
    },
    status: "active",
  },
  {
    id: 3,
    requester: {
      id: 3,
      location: [28.7040592, 77.0924915],
      detail: {
        name: "Jane Doe",
        msg: "lorem ipsum doler set",
      },
    },
    status: "active",
  },
];

const Cards = ({ position, detail }) => {
  return (
    <>
      <div onClick={() => console.log("expand")}>
        Name: {detail.name} <br />
        MSG: {detail.msg}
      </div>
    </>
  );
}; //checked

const HelpingInterface = ({ handleCancelHelp, requestDoc }) => {
  return (
    <Card style={{ marginBottom: "5%" }}>
      <CardActionArea>
        <CardContent>
          <Typography
            variant="h4"
            color="textSecondary"
            component="h2"
            style={{
              color: " black",
              fontSize: "1.75rem",
              textAlign: "center",
              marginBottom: "2%",
            }}
          >
            Great!
          </Typography>
          <Typography
            variant="h4"
            color="textSecondary"
            component="h2"
            style={{
              color: "black",
              fontSize: "1.4rem",
              textAlign: "center",
              marginBottom: "7%",
            }}
          >
            You have volunteered to help
          </Typography>
          <Typography
            variant="body1"
            color="text "
            component="h2"
            style={{
              color: "black",
              fontSize: "1.2rem",
              textAlign: "center",
              marginBottom: "3%",
            }}
          >
            lorem ipsum si dolot et amet
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={() => handleCancelHelp(requestDoc)}
          variant="contained"
          size="large"
          color="secondary"
          style={{ fontSize: "1.1rem", marginLeft: "2%", width: "100%" }}
        >
          Cancel Help
        </Button>
        <Button
          onClick={() => console.log("toggled direction")}
          variant="contained"
          size="large"
          color="secondary"
          style={{ marginLeft: "3%", width: "100%", padding: "11px 22px" }}
        >
          Toggle Directions
        </Button>
      </CardActions>
    </Card>
  );
}; //checked

const RequestMarkers = ({
  requestDocs,
  handleHelpingOthers,
  user,
  location,
}) => {
  const classes = useStyles();
  const [requests, setRequests] = useState([...requestDocs]);
  useEffect(() => {
    console.log("request markers");
    setRequests([...requestDocs]);
  }, [requestDocs]);
  return (
    <>
      {requests.map((requestDoc) => (
        <Marker
          key={requestDoc.data().id}
          position={requestDoc.data().requester.location}
          icon={othersIcon}
        >
          <Popup
            style={{
              width: "50px",
              color: "black",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography
                  variant="h4"
                  component="h2"
                  className={classes.heading}
                >
                  {requestDoc.data().requester.detail.name}
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  className={classes.name}
                >
                  {requestDoc.data().requester.detail.msg}
                </Typography>
                <Typography
                  variant="body1"
                  color="text "
                  component="h2"
                  style={{ fontSize: "1.25rem", textAlign: "center" }}
                ></Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleHelpingOthers(requestDoc, user, location)}
                variant="contained"
                size="large"
                color="secondary"
                className={classes.button}
              >
                Help them
              </Button>
            </CardActions>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const RequestCards = ({ requestDocs }) => {
  const [requests, setRequests] = useState([...requestDocs]);
  useEffect(() => {
    console.log("request cards");
    setRequests([...requestDocs]);
  }, [requestDocs]);
  return (
    <>
      {requests.map((requestDoc) => (
        <Cards
          key={requestDoc.data().id}
          position={requestDoc.data().requester.location}
          detail={requestDoc.data().requester.detail}
        />
      ))}
    </>
  );
};

const RequesterMarker = ({ requestDoc, userLocation }) => {
  // the person whom you are helping
  const [requester, setRequester] = useState(null);
  const [leafletref, setLeafletref] = useState(null);
  const { map } = useLeaflet();
  useEffect(() => {
    return () => {
      if (leafletref != null) map.removeControl(leafletref);
    };
  }, []);
  const returnOut = (requestDoc) => {
    const leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(
          requestDoc.data().requester.location[0],
          requestDoc.data().requester.location[1]
        ),
      ],
      router: L.Routing.mapbox(
        "pk.eyJ1Ijoia2FuaXNoa2d1cHRhMjAwMCIsImEiOiJjazdpdmd5aG8wMDYwM2ZvN2U5eWs0Mm55In0.svdKVHGfRl4873N_UZBoaA"
      ),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4,
          },
        ],
      },
      addWaypoints: false,
      collapsible: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
    });
    return leafletElement;
  };

  if (requestDoc) {
    return (
      <Marker position={requestDoc.data().requester.location} icon={othersIcon}>
        <Popup
          style={{
            width: "50px",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          {requestDoc.data().requester.detail.name}
          {leafletref == null ? (
            <Button
              onClick={() => {
                let x = returnOut(requestDoc).addTo(map);
                setLeafletref(x);
              }}
            >
              Show Directions
            </Button>
          ) : (
            <>
              {" "}
              <Button
                onClick={() => {
                  map.removeControl(leafletref);
                  setLeafletref(null);
                }}
              >
                Hide Directions
              </Button>
            </>
          )}
        </Popup>
      </Marker>
    );
  } else {
    return <></>;
  }
};
const RequesterCard = ({ requestDoc }) => {
  if (requestDoc) {
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography
              variant="h4"
              color="textSecondary"
              component="h2"
              style={{
                color: "black",
                fontSize: "1.4rem",
                textAlign: "center",
                marginBottom: "7%",
              }}
            >
              You are helping
            </Typography>
            <Typography
              variant="body1"
              color="text "
              component="h2"
              style={{
                color: "black",
                fontSize: "1.75rem",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              {requestDoc.data().requester.detail.name}
            </Typography>
            <Typography
              variant="h4"
              color="textSecondary"
              component="h2"
              style={{
                color: "black",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              {requestDoc.data().requester.detail.msg}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    );
  } else {
    return <></>;
  }
};
const HelperMarker = ({ requestDoc, userLocation }) => {
  const { map } = useLeaflet();
  const [helper, setHelper] = useState(null);
  const [leafletref, setLeafletref] = useState(null);
  useEffect(() => {
    return () => {
      if (leafletref != null) map.removeControl(leafletref);
    };
  }, []);
  const returnOut = (requestDoc) => {
    const leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(userLocation[0], userLocation[1]),
        L.latLng(
          requestDoc.data().helper.location[0],
          requestDoc.data().helper.location[1]
        ),
      ],
      router: L.Routing.mapbox(
        "pk.eyJ1Ijoia2FuaXNoa2d1cHRhMjAwMCIsImEiOiJjazdpdmd5aG8wMDYwM2ZvN2U5eWs0Mm55In0.svdKVHGfRl4873N_UZBoaA"
      ),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4,
          },
        ],
      },
      addWaypoints: false,
      collapsible: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
    });
    return leafletElement;
  };

  if (requestDoc && requestDoc.data().helper) {
    return (
      <Marker position={requestDoc.data().helper.location} icon={othersIcon}>
        <Popup
          style={{
            width: "50px",
            color: "black",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          {requestDoc.data().helper.detail.name}

          {leafletref == null ? (
            <button
              onClick={() => {
                let x = returnOut(requestDoc).addTo(map);
                setLeafletref(x);
              }}
            >
              Show Directions
            </button>
          ) : (
            <>
              {" "}
              <button
                onClick={() => {
                  map.removeControl(leafletref);
                  setLeafletref(null);
                }}
              >
                Hide Directions
              </button>
            </>
          )}
        </Popup>
      </Marker>
    );
  } else {
    return <></>;
  }
};

const RequestedHelpInterface = ({ handleCancelRequest, handleFulfilled }) => {
  const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    heading: {
      textAlign: "center",
      color: "black",
      marginBottom: "5%",
      fontSize: "2rem",
    },
    button: {
      marginLeft: "25%",
      fontSize: "1.1rem",
      padding: "8px 15px",
    },
  }));

  const classes = useStyles();
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography
            variant="h4"
            color="textSecondary"
            component="h2"
            className={classes.heading}
          >
            You have requested help <br />
          </Typography>
          <Typography
            variant="body1"
            color="text "
            component="h2"
            style={{ fontSize: "1.25rem", textAlign: "center" }}
          >
            If someone accepts to help you they will appear here
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          onClick={handleCancelRequest}
          variant="contained"
          size="large"
          color="secondary"
          className={classes.button}
        >
          Cancel Request
        </Button>
        <Button
          onClick={handleFulfilled}
          variant="contained"
          size="large"
          color="secondary"
          className={classes.button}
        >
          Received Help
        </Button>
      </CardActions>
    </Card>
  );
};

const HelperCard = ({ requestDoc }) => {
  const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    heading: {
      textAlign: "center",
      color: "black",
      marginBottom: "5%",
      fontSize: "2rem",
    },
    name: {
      textAlign: "center",
      color: "black",
      fontWeight: "bold",
      marginBottom: "5%",
      fontSize: "2.5rem",
    },
    button: {
      marginLeft: "5%",
      fontSize: "1.25rem",
      padding: "8px 15px",
    },
  }));

  const classes = useStyles();

  if (requestDoc && requestDoc.data().helper) {
    return (
      <>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography
                variant="h4"
                component="h2"
                className={classes.heading}
              >
                Your request has been accepted by
              </Typography>
              <Typography variant="h4" component="h2" className={classes.name}>
                {requestDoc.data().helper.detail.name}
              </Typography>

              <Typography
                variant="body1"
                color="text "
                component="h2"
                style={{ fontSize: "1.25rem", textAlign: "center" }}
              >
                {"In urgent need of a sanitary napkin"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {/* <Button  variant="contained" size="large" color="secondary" className={classes.button}>
        Help Received
      </Button>
      <Button  variant="contained" size="large" color="secondary"className= {classes.button}>
      Cancel Request       
      </Button> */}
          </CardActions>
        </Card>
      </>
    );
  } else {
    return <div>If someone accepts to help you they will appear here.</div>;
    // return (
    // <Card>
    // <CardActionArea>
    //   <CardContent >
    //     <Typography variant="h4" component="h2" className= {classes.heading}>
    //     If someone accepts to help you they will appear here
    //       </Typography>
    //       </CardContent>
    //       </CardActionArea>
    //       </Card>
    // );
  }
};

const Map = (props) => {
  const [requestDocs, setRequestDocs] = useState([]);
  const [user] = useContext(UserContext);
  const [location, setLocation] = usePersistedState("location", [0, 0]);
  const [geohash, setGeohash] = usePersistedState(
    "geohash",
    encode(location[0], location[1], 8)
  );
  const [request, setRequest] = useState(null); // cyclic object error
  const [requestId, setRequestId] = usePersistedState("request id", undefined);
  const [isDefault, setIsDefault] = usePersistedState("default map", true);
  const [isHelping, setIsHelping] = usePersistedState("helping other", false);
  const [requestedHelp, setRequestedHelp] = usePersistedState(
    "requested help",
    false
  );
  const [cancelledHelp, setCancelledHelp] = usePersistedState(
    "cancelled help",
    false
  );
  const [cancelledRequest, setCancelledRequest] = usePersistedState(
    "cancelled request",
    false
  );
  const [helpedSuccessfully, setHelpedSuccessfully] = usePersistedState(
    "helped successfully",
    false
  );
  const [requestFulfilled, setRequestFulfilled] = usePersistedState(
    "request fulfilled",
    false
  );

  const mapRef = useRef();

  useEffect(() => {
    console.log("map 1");
    const watcher = navigator.geolocation.watchPosition(
      (pos) => setLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err.message)
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [setLocation]);

  useEffect(() => {
    console.log("map 2");
    setGeohash(() => encode(location[0], location[1], 8));
    // for debugging purpose only
    console.log("current location: ", location);
  }, [location, setGeohash]);

  useEffect(() => {
    console.log("map 3");
    const unsubscribe = db
      .collection("requests")
      .where("status", "==", "active")
      // .where("requester.geohash", "in", [...neighbors(geohash), geohash])  // uncomment this if you want nearby feature
      .onSnapshot((snapshot) => setRequestDocs([...snapshot.docs]));
    return () => unsubscribe();
  }, [geohash]);

  useEffect(() => {
    console.log("map 4");
    let unsubscribe = () => {};
    if (requestedHelp && request) {
      unsubscribe = request.ref.onSnapshot((snapshot) => setRequest(snapshot));
      if (request.data().requester.geohash !== geohash) {
        request.ref.update({
          "requester.location": location,
          "requester.geohash": geohash,
        });
      }
    }
    return () => unsubscribe();
  }, [requestedHelp, geohash]);

  useEffect(() => {
    console.log("map 5");
    let unsubscribe = () => {};
    if (isHelping && request) {
      unsubscribe = request.ref.onSnapshot((snapshot) => {
        setRequest(snapshot);
        if (snapshot.data().status === "cancelled") {
          setIsHelping(false);
          setIsDefault(true);
          console.log("request was cancelled, Thanks anyway!");
          setRequest(null);
        } else if (snapshot.data().status === "fulfilled") {
          setIsHelping(false);
          setHelpedSuccessfully(true);
        }
      });
      if (
        request &&
        request.data().helper &&
        request.data().helper.geohash !== geohash
      ) {
        request.ref.update({
          "helper.location": location,
          "helper.geohash": geohash,
        });
      }
    }
    return () => unsubscribe();
  }, [isHelping, geohash]);

  useEffect(() => {
    console.log("map 6");
    if (request) setRequestId(request.id);
  }, [request, setRequestId]);

  useEffect(() => {
    (async () => {
      if (!request) {
        const doc = await db.collection("requests").doc(`${requestId}`).get();
        setRequest(doc);
      }
    })();
    console.log("map 7");
  }, []);

  const handleHelpingOthers = async (requestDoc, user, location) => {
    console.log("helping others clicked"); // for debugging
    try {
      const helper = {
        id: user.data.uid,
        location: location,
        geohash: geohash,
        detail: {
          name: user.data.name,
        },
      };
      await requestDoc.ref.update({ helper: helper, status: "helping" });
      setRequest(requestDoc);
      setIsDefault(false);
      setIsHelping(true);
    } catch (err) {
      console.log("failed to help:", err.message);
    }
  };

  const handleRequest = async () => {
    console.log("help is requested");
    try {
      setIsDefault(false);
      const request = {
        id: new Date().toLocaleString(),
        requester: {
          id: user.data.uid,
          detail: {
            name: user.data.name,
            msg: "make this message work with modal",
          },
          location: location,
          geohash: geohash,
        },
        status: "active",
      };
      const requestRef = await db.collection("requests").add(request);
      const requestDoc = await requestRef.get();
      setRequest(requestDoc);
      setRequestedHelp(true);
    } catch (err) {
      setIsDefault(true);
      setRequestedHelp(false);
      console.log("failed to request for help", err.message);
    }
  };

  const handleCancelHelp = (requestDoc) => {
    console.log("cancel help clicked");
    try {
      requestDoc.ref.update({ helper: null, status: "active" });
      setIsHelping(false);
      setCancelledHelp(true);
    } catch (err) {
      console.log("failed to cancel help", err.message);
    }
  };

  const handleCancelRequest = async () => {
    console.log("request cancelled is clicked");
    try {
      await request.ref.update({ status: "cancelled" });
      setRequestedHelp(false);
      setCancelledRequest(true);
    } catch (err) {
      console.log("failed to cancel request", err.message);
    }
  };

  const handleFulfilled = async () => {
    console.log("request fulfilled is clicked");
    try {
      await request.ref.update({ status: "fulfilled" });
      setRequestedHelp(false);
      setRequestFulfilled(true);
    } catch (err) {
      console.log("failed to mark request fulfilled", err.message);
    }
  };

  // CODE FOR SWIPESHEET---------------------------------------------------------
  const draggingRef = useRef(false);
  const [{ y }, set] = useSpring(() => ({ y: height })); //jaha bhi hai waha se yaha
  let myPos = 0;
  const open = ({ canceled }) => {
    set({ y: myPos, config: canceled ? config.wobbly : config.stiff });
  };
  const close = (velocity = 0) => {
    set({ y: height, config: { ...config.stiff, velocity } });
  };
  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (first) draggingRef.current = true;
      else if (last) setTimeout(() => (draggingRef.current = false), 0);
      if (my < -70) cancel();
      console.log(my);
      console.log(height * 0.75);
      if (last) my > height * 0.75 || vy > 0.5 ? open(vy) : close(vy);
      else set({ y: my, immediate: false, config: config.stiff });
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );
  const display = y.to((py) => (py < height ? "block" : "block"));
  const bgStyle = {
    transform: y.to(
      [0, height],
      ["translateY(-8%) scale(1.16)", "translateY(0px) scale(1)"]
    ),
    opacity: y.to([0, height], [0.4, 1], "clamp"),
  };

  //CODE FOR SWIPESHEET ENDS--------------------------------------------------------------------

  //CODE FOR SIDE DRAWER==========================================================
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [isSwipeOpen, setSwipeOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <Header />
      <Divider />
      <List>
        <ListItem>
          <ListItemIcon>
            {" "}
            <DateRangeIcon style={{ fontSize: "30px", color: "#f50057" }} />
          </ListItemIcon>
          <ListItemText>
            <Button
              color="black"
              style={{ fontSize: "1.2rem", textTrandform: "none" }}
            >
              Period Tracker
            </Button>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {" "}
            <WorkOutlineIcon style={{ fontSize: "30px", color: "#f50057" }} />
          </ListItemIcon>
          <ListItemText>
            <Button
              color="black"
              style={{ fontSize: "1.2rem", textTrandform: "none" }}
            >
              Opportunity Portal
            </Button>
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {" "}
            <AccountCircleIcon style={{ fontSize: "30px", color: "#f50057" }} />
          </ListItemIcon>
          <ListItemText>
            <Button
              color="black"
              style={{ fontSize: "1.2rem", textTrandform: "none" }}
            >
              Account
            </Button>
          </ListItemText>{" "}
          {/*Link to Dashboard*/}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {" "}
            <HomeIcon style={{ fontSize: "30px", color: "#f50057" }} />
          </ListItemIcon>
          <ListItemText>
            <Button
              color="black"
              style={{ fontSize: "1.2rem", textTrandform: "none" }}
            >
              Homepage
            </Button>
          </ListItemText>{" "}
          {/*Link to Landing*/}
        </ListItem>
        {/* {[", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ?  : <MailIcon style={{fontSize: '30px', color: '#f50057'}} />}
            </ListItemIcon>
            
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <List>
        <img src={logout} style={{ width: "50px", marginTop: "100%" }} />
        <span style={{ margin: theme.spacing(1) }}>
          <Button
            onClick={() => {
              auth.signOut();
            }}
            color="black"
            style={{ fontSize: "1.2rem" }}
          >
            LOGOUT
          </Button>
        </span>
        {/* <span style={{fontSize: '1.5rem'}}>Logout</span> */}
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  //CODE FOR SIDE DRAWER ENDS======================================================

  return (
    <>
      {isDefault ? (
        <IconButton
          style={{
            position: "absolute",
            top: "90px",
            right: "40px",
            zIndex: "10",
            height: "48px",
            width: "48px",
            backgroundColor: "white",
          }}
          color="inherit"
          edge="start"
          onClick={() => {
            if (isSwipeOpen) {
              close();
              setSwipeOpen(false);
            } else {
              open(10);
              setSwipeOpen(true);
            }
          }}
        >
          <PersonPinCircleIcon fontSize="large" />
        </IconButton>
      ) : (
        <></>
      )}
      {isDefault ? (
        <IconButton
          style={{
            position: "absolute",
            top: "140px",
            right: "40px",
            zIndex: "10",
            height: "48px",
            width: "48px",
            backgroundColor: "white",
          }}
          color="inherit"
          edge="start"
          onClick={() => {
            const { current = {} } = mapRef;
            const { leafletElement: map } = current;
            setTimeout(() => {
              map.flyTo(
                location,
                16,
                {
                  duration: 3,
                },
                1000
              );
            });
          }}
        >
          <LocationSearchingIcon fontSize="large" />
        </IconButton>
      ) : (
        <></>
      )}

      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <LeafletMap ref={mapRef} center={location} zoom={17}>
            <TileLayer
              url={
                "https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FuaXNoa2d1cHRhMjAwMCIsImEiOiJjazdpdmd5aG8wMDYwM2ZvN2U5eWs0Mm55In0.svdKVHGfRl4873N_UZBoaA"
              }
            />
            <Marker position={location} icon={userIcon}>
              <Popup
                style={{
                  width: "50px",
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                You
              </Popup>
            </Marker>
            {isDefault ? (
              <RequestMarkers
                requestDocs={requestDocs}
                handleHelpingOthers={handleHelpingOthers}
                user={user}
                location={location}
              />
            ) : (
              <></>
            )}
            {isHelping ? (
              <RequesterMarker userLocation={location} requestDoc={request} />
            ) : (
              <></>
            )}
            {requestedHelp ? (
              <HelperMarker userLocation={location} requestDoc={request} />
            ) : (
              <></>
            )}
          </LeafletMap>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          {/* <div className="request-interface"> */}

          {isDefault ? (
            <>
              <a.div
                className="sheet"
                style={{
                  display,
                  bottom: `calc(-80vh + ${height - 100}px)`,
                  y,
                  backgroundColor: "#f8c9d4",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    width: "100%",
                    padding: "5% 0",
                    fontSize: "1.75rem",
                    textTransform: "none",
                  }}
                  onClick={handleRequest}
                >
                  Request help
                </Button>
                <PerfectScrollbar style={{ height: "100%" }}>
                  <Menu2
                    mapRef={mapRef}
                    user={user}
                    location={location}
                    dishes={requestDocs}
                  />
                  {/* <RequestCards dummyRequests={dummyRequests} /> */}
                </PerfectScrollbar>
              </a.div>
            </>
          ) : (
            <></>
          )}
          {isHelping ? (
            <>
              <div className="sheet2">
                <HelpingInterface
                  handleCancelHelp={handleCancelHelp}
                  requestDoc={request}
                />
                <RequesterCard requestDoc={request} />
              </div>
            </>
          ) : (
            <></>
          )}
          {requestedHelp ? (
            <>
              <div className="sheet2">
                <RequestedHelpInterface
                  handleCancelRequest={handleCancelRequest}
                  handleFulfilled={handleFulfilled}
                />
                <HelperCard requestDoc={request} />
              </div>
            </>
          ) : (
            <></>
          )}
          {cancelledHelp ? (
            <>
              <div className="sheet2">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: " black",
                          fontSize: "1.75rem",
                          textAlign: "center",
                          marginBottom: "7%",
                        }}
                      >
                        You have cancelled your help
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: "black",
                          fontSize: "1.4rem",
                          textAlign: "center",
                        }}
                      >
                        Your rating
                        <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/">
                      <Button
                        onClick={() => localStorage.clear()}
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{
                          fontSize: "1.1rem",
                          marginLeft: "85%",
                          width: "100%",
                        }}
                      >
                        Go Home
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            </>
          ) : (
            <></>
          )}
          {cancelledRequest ? (
            <>
              <div className="sheet2">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: " black",
                          fontSize: "1.75rem",
                          textAlign: "center",
                          marginBottom: "7%",
                        }}
                      >
                        You have cancelled your request
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: "black",
                          fontSize: "1.4rem",
                          textAlign: "center",
                        }}
                      >
                        Your rating <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/">
                      <Button
                        onClick={() => localStorage.clear()}
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{
                          fontSize: "1.1rem",
                          marginLeft: "65%",
                          width: "100%",
                        }}
                      >
                        Go to home
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            </>
          ) : (
            <></>
          )}
          {helpedSuccessfully ? (
            <>
              {/* <div className="sheet2">
            <div>You have Successfully Helped Someone!, Congrats</div>
            <div>
              your rating <br />
              {/* rating */}
              {/* <Link to="/">
                <button onClick={() => localStorage.clear()}>go home</button>
              </Link>
            </div>
            </div>  */}

              <div className="sheet2">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: " black",
                          fontSize: "1.75rem",
                          textAlign: "center",
                          marginBottom: "2%",
                        }}
                      >
                        Congrats!
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: "black",
                          fontSize: "1.4rem",
                          textAlign: "center",
                          marginBottom: "7%",
                        }}
                      >
                        You have successfully helped someone!
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: "black",
                          fontSize: "1.4rem",
                          textAlign: "center",
                        }}
                      >
                        Your rating <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/">
                      <Button
                        onClick={() => localStorage.clear()}
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{
                          fontSize: "1.1rem",
                          marginLeft: "65%",
                          width: "100%",
                        }}
                      >
                        Go to home
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            </>
          ) : (
            <></>
          )}
          {requestFulfilled ? (
            <>
              {/* <div className="sheet2"> 
            <div>You have Received Help Congratulations!</div>
            <div>
              your rating <br />
              rating
              <Link to="/">
                <button onClick={() => localStorage.clear()}>go home</button>
              </Link>
            </div>
            </div> */}
              <div className="sheet2">
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: " black",
                          fontSize: "1.75rem",
                          textAlign: "center",
                          marginBottom: "2%",
                        }}
                      >
                        Congrats!
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: "black",
                          fontSize: "1.4rem",
                          textAlign: "center",
                          marginBottom: "7%",
                        }}
                      >
                        Your request was completed!
                      </Typography>
                      <Typography
                        variant="h4"
                        color="textSecondary"
                        component="h2"
                        style={{
                          color: "black",
                          fontSize: "1.4rem",
                          textAlign: "center",
                        }}
                      >
                        Your rating <br />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Link to="/">
                      <Button
                        onClick={() => localStorage.clear()}
                        variant="contained"
                        size="large"
                        color="secondary"
                        style={{
                          fontSize: "1.1rem",
                          marginLeft: "65%",
                          width: "100%",
                        }}
                      >
                        Go to home
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* </div> */}
        </main>
      </div>
    </>
  );
};
export default Map;
