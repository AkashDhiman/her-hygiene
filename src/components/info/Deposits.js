import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import image1 from './images/edu1.jpeg';
import image2 from './images/edu2.jpg';
import image3 from './images/edu3.jpg';
import image4 from './images/edu4.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    maxWidth: 700,
    height: 550,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));



 const tileData = [
    {
      img: image1,
      title: 'Menstrual blood is not normal',
      content: 'The blood discharged during menses is not impure or defiled and is very much normal. The altered assumption may be due to the fact that menstrual blood comes out of the vagina mixed with the uterine lining tissue which appears to be slightly different from blood that is not mixed with any tissue.'
      },
    {
      img: image2,
      title: 'Myth2',
      content: 'The blood discharged during menses is not impure or defiled and is very much normal. The altered assumption may be due to the fact that menstrual blood comes out of the vagina mixed with the uterine lining tissue which appears to be slightly different from blood that is not mixed with any tissue.'
    },
    {
      img: image3,
      title: 'Myth3',
      content: 'On attaining puberty, the female uterus starts forming a cushioning layer of tissues to receive and nourish the foetus on a periodic basis. When the baby isn’t conceived, the body flushes out the cushioning tissue and consequently some blood, which we observe during our period. If the female body is revered as the chalice of the divine, it should be so at all times. Why should those five days be an exception?',
    },
    {
      img: image4,
      title: 'You should not pray during periods',
      content: 'On attaining puberty, the female uterus starts forming a cushioning layer of tissues to receive and nourish the foetus on a periodic basis. When the baby isn’t conceived, the body flushes out the cushioning tissue and consequently some blood, which we observe during our period. If the female body is revered as the chalice of the divine, it should be so at all times. Why should those five days be an exception?',
    },
  ];
 
export default function Deposits() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  return (
    <div className={classes.root}>
    <GridList cellHeight={220} className={classes.gridList}>
      <GridListTile key="Subheader" cols={2} style={{ height: 'auto', background: 'linear-gradient(to right, #ed213a, #93291e'}}>
        <ListSubheader component="div" style={{fontSize: '3rem', fontWeight: 'bold',textAlign: 'center', marginTop: '1%', color:'white'}}>Myth v/s fact</ListSubheader>
      </GridListTile>
      {tileData.map((tile) => (
        <GridListTile key={tile.img}>
          <img src={tile.img} alt={tile.title} style={{height:'100%'}} />
          <GridListTileBar
          title=  {tile.title}
            actionIcon={
              <Button onClick={handleClickOpen('paper')}>
              <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                <InfoIcon />
              </IconButton>
              </Button>
              
            }/>
            <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Fact</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            style={{fontSize: '1.5rem'}}
          >
          {/* A 2014 report by the NGO Dasra informed that almost 23 million girls in India drop out of school annually, because of lack of menstrual hygiene management facilities, including the availability of sanitary napkins and awareness about menstruation. 
                The report further suggests that the girls, who don’t drop out, usually miss up to 5 days of school every month
                Menstruation is such a taboo subject that many women are ashamed even to seek medical advice if they face any health problems due to menstruation. Unhygienic menstrual conditions often result in women developing health problems which are further aggravated due to their inability to seek medical help on time
                Conditions for menstruating women in India can only improve when awareness of menstrual hygiene is spread. IEC on menstrual hygiene, under Swachh Bharat Abhiyan or any other state scheme, must educate women across all ages on what menstruation is and why the taboos surrounding it do tremendous harm. Simultaneously, sanitary napkins must be provided to menstruating women to ensure that they do not fall prey to age old unhygienic traditions of using cloth, soil or sand. It must be remembered that 88% of India’s menstruating women do not use sanitary napkins. Making sanitary napkins available to over 300 million women and ensuring that they do use these will be a herculean task, and can only be achieved with due cooperation 
                all stakeholders and proper coordination between them to improve the status menstrual hygiene in India. */}
              {tile.content}

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" >
            Close
          </Button>
        </DialogActions>
      </Dialog>
           
            
        </GridListTile>
      ))}
    </GridList>
  </div>
  );
}
