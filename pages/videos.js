import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Navbar from "../Components/Navigation/Navbar";
import ListItemText from '@material-ui/core/ListItemText';
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import ReactPlayer from 'react-player';
import axios from 'axios';
import _ from 'underscore';
import moment from 'moment';
import Router from "next/router";
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  from {
    opacity: 20%;
  }

  to {
    opacity: 70%;
  }
`

const PulseBar = styled.div`
  height: 100%;
  width: 100%;
  background-color: #d1d1d1;
  display: inline-block;
  animation: ${pulse} 1.2s ease-in-out;
  animation-iteration-count: infinite;
`

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    padding: "34px 0",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  column: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "left",
    width: "100%",
    height: "570px",
    marginTop: "-35px",
    fontFamily: "Segoe UI",
    fontSize: "20px",
    color: "#7e7e7e",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflowY: "auto",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0",
      fontSize: "24px",
      height: "80%",
    },
  },
  main: {
    padding: "4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },
  },
  offline: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  typo: {
    display: "none",
    color: "#7e7e7e",
    fontWeight: "bold",
    fontFamily: "Segoe UI",
    marginLeft: "9%",
    [theme.breakpoints.down("xs")]: {
      display: "block",
    },
  },
  video: {
    width: "100%",
    height: "75%",
    position: "relative",
    padding: "20px",
    backgroundColor: "#dae3f0",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "17px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "80px",
      padding: "10px",
      height: "300px"
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "80px",
      padding: "10px",
      height: "250px"
    },
  },
  dateButton: {
    color: "#7e7e7e",
    width: "100%",
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px"
    }
  },
  item: {
    textAlign: "center"
  },
  desktop: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  mobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  modal: {
    position: "absolute",
    zIndex: "1",
    padding: "20px",
    paddingTop: "100px",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },
  close: {
    color: "#000",
    fontSize: "60px",
    fontWeight: "bold",
    cursor: "pointer",
    position: "absolute",
    top: "0px",
    right: "0px",
    zIndex: "2"
  },
  modalContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  greyBar: {
    width: "100px",
    height: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "25%",
      height: "28px"
    },
    [theme.breakpoints.down("xs")]: {
      width: "200px"
    }
  },
  listItem: {
    justifyContent: "center"
  },
  videoLoader: {
    width: "100%",
    height: "100%",
    backgroundColor: "#d1d1d1",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const Videos = ({ baseURL }) => {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const [url, setUrl] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [dates, setDates] = React.useState(null);
  const [currDate, setCurrDate] = React.useState(null);
  const [currVideos, setCurrVideos] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (moment(event.target.id, "YYYY-MM-DD", true).isValid()) {
      setCurrDate(event.target.id);
      setCurrVideos(data[event.target.id].reverse());
    }
    setAnchorEl(null);
  };

  const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  const formatDate = (input_date) => {
    const months = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
    const split_date = input_date.split('-');
    const number_month = split_date[1][0] === '0' ? split_date[1][1] : split_date[1];
    const date = parseInt(split_date[2][0] === '0' ? split_date[2][1] : split_date[2]);
    const month = months[number_month];
    return `${month} ${date}${nth(date)}, ${split_date[0]}`;
  }

  React.useEffect(() => {
    async function getVideos() {
      try {
        const req_url = `${baseURL}/api/videos?baseURL=${baseURL}`;
        const response = await axios.get(req_url);
        setDates(response.data.date_list);
        setData(response.data.videos);
        setCurrDate(response.data.date_list[0]);
        setCurrVideos(response.data.videos[response.data.date_list[0]].reverse());
      }
      catch (error) {
        console.log(error);
      }
    }

    getVideos();
  }, []);




  return (
    <>
      <div className={classes.desktop}>
        <Container>
          <Grid className={classes.grid} container spacing={5}>
            <Grid item xs={12} sm={3} md={2}>
              <Navbar />
            </Grid>
            <Grid className={classes.main} item xs={12} sm={3} md={2}>
              <h1 style={{ color: '#7e7e7e', fontWeight: 'bold', fontFamily: 'Segoe UI', marginBottom: "0px" }}>Videos</h1>
              <div className={classes.column}>
                <Paper className={classes.paper}>
                  <List component="nav" className={classes.root}>

                    <ListItem divider className={classes.listItem}>
                      {
                        currDate ?
                          <>
                            <Button className={classes.dateButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                              {formatDate(currDate)}
                            </Button>
                            <Menu
                              anchorEl={anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              onClose={handleClose}
                            >
                              {dates
                                ? dates.map((date, key) => {
                                  return <MenuItem key={key} onClick={handleClose} id={date}>{formatDate(date)}</MenuItem>
                                })
                                : null
                              }
                            </Menu>
                          </>
                          : <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                      }

                    </ListItem>
                    {
                      currVideos
                        ? currVideos.map((video, key) => (
                          <ListItem button divider key={key} onClick={() => setUrl(video.url)}>
                            <ListItemText className={classes.item}>{video.time}</ListItemText>
                          </ListItem>
                        ))
                        : <>
                          <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <div className={classes.greyBar}><PulseBar /></div>
                          </ListItem>
                        </>
                    }
                  </List>
                </Paper>
              </div>
            </Grid>
            <Grid className={classes.main} item xs={12} sm={6} md={8}>
              <div style={{ width: "100%", height: "100%", marginTop: "85px" }}>
                <div className={classes.video}>
                  {
                    url ?
                      <ReactPlayer
                        style={{ borderRadius: "10px", overflow: "hidden" }}
                        url={url}
                        width='100%'
                        height='100%'
                        controls
                      />
                      : <div className={classes.videoLoader}><img src="/logo.png" alt="logo" style={{ width: "100px", borderRadius: "50%", boxShadow: "0px 5px 10px #a0a0a0" }} /></div>
                  }
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>

      <div className={classes.mobile}>

        {modal
          ? <div class={classes.modal}>
            <div class={classes.modalContent}>

              <div class={classes.close} onClick={() => setModal(false)}>&times;</div>
              <div className={classes.video} style={{ display: "block" }}>
                {
                  url ?
                    <ReactPlayer
                      style={{ borderRadius: "10px", overflow: "hidden" }}
                      url={url}
                      width='100%'
                      height='100%'
                      controls
                    />
                    : <div className={classes.videoLoader}><img src="/logo.png" alt="logo" style={{ width: "100px", borderRadius: "50%", boxShadow: "0px 5px 10px #a0a0a0" }} /></div>
                }
              </div>
            </div>
          </div>
          : null
        }

        <Grid className={classes.main} item xs={12} sm={12}>
          <div style={{ display: 'flex', alignItems: "center" }}>
            <img src="/back.png" style={{ width: "30px", height: "30px", marginRight: "20px", cursor: "pointer" }} onClick={() => Router.push('/')} />
            <h1 style={{ color: '#7e7e7e', fontFamily: 'Segoe UI', marginTop: "20px", marginBottom: '20px' }}>Videos</h1>
          </div>
          <div className={classes.column}>
            <Paper className={classes.paper}>
              <List component="nav" className={classes.root}>

                <ListItem divider className={classes.listItem}>
                  {
                    currDate ?
                      <>
                        <Button className={classes.dateButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                          {formatDate(currDate)}
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          {dates
                            ? dates.map((date, key) => {
                              return <MenuItem key={key} onClick={handleClose} id={date}>{formatDate(date)}</MenuItem>
                            })
                            : null
                          }
                        </Menu>
                      </>
                      : <ListItem className={classes.listItem}>
                        <div className={classes.greyBar}><PulseBar /></div>
                      </ListItem>
                  }
                </ListItem>

                {currVideos
                  ? currVideos.map((video, key) => (
                    <ListItem
                      key={key}
                      button
                      divider
                      onClick={() => {
                        setModal(true)
                        setUrl(video.url)
                      }}
                      style={{ display: "flex", flexDirection: "column", justifyContent: "left" }}
                    >
                      <ListItemText className={classes.item}>{video.time}</ListItemText>
                    </ListItem>
                  ))
                  : <>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                  </>
                }
              </List>
            </Paper>
          </div>
        </Grid>
      </div>
    </>
  );
};
export default Videos;
