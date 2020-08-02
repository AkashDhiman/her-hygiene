import React,{useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from './images/map.jpg';
import { othersIcon, userIcon } from "./icon";

import './styles.css'
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useLeaflet,
} from "react-leaflet";
import L from "leaflet";
const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 240,
    marginTop: 10,
  },
});

export default function Map1() {
  const classes = useStyles();
  const mapRef = useRef();

  //"../images/Arunachalam.jpg"
  return (
    <Card className={classes.root}>
      {/* <CardActionArea > */}
        {/* <CardMedia
          className={classes.media}
          image={img}
          title="Contemplative Reptile"
        /> */}
         <LeafletMap center={[28.6469351,77.1130001]} zoom={17}>
          <TileLayer
            url={"https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
          />
          <Marker position={[28.6469351,77.1130001]} icon={userIcon} />
          {/* ROUTING LAYER CALL KARO YAHA PE DONO KE */}
        </LeafletMap>

      {/* </CardActionArea> */}
    </Card>
  );
}
