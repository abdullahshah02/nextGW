import React from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "../Components/Navigation/Navbar";
import Container from "@material-ui/core/Container";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
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
  grid: {
    padding: "34px 0",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  paper: {
    padding: "40px",
    textAlign: "left",
    width: "78%",
    height: "555px",
    overflowY: "auto",
    fontFamily: "Segoe UI",
    fontSize: "20px",
    marginTop: '20px',
    color: "#7e7e7e",
    backgroundColor: "#fff",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    //boxShadow: "5px 6px 13px  grey",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  paperMobile: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      padding: "20px",
      textAlign: "left",
      width: "100%",
      height: "555px",
      overflowY: "auto",
      fontFamily: "Segoe UI",
      fontSize: "20px",
      marginTop: '20px',
      color: "#7e7e7e",
      backgroundColor: "#fff",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
    },
  },
  main: {
    padding: "0rem",
    [theme.breakpoints.down("xs")]: {
      padding: "2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
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
  header: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  backButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
  },
  bar: {
    height: "12px",
    width: "40px",
    backgroundColor: "#f00202",
    display: "inline-block",
    marginTop: "8px",
    border: "1px solid #7e7e7e"
  },
  greyBar: {
    width: "140px",
    height: "28px",
    [theme.breakpoints.down("sm")]: {
      width: "25%",
      height: "28px"
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%"
    }
  },
  list: {
    width: "100%",
  },
  listItem: {
    width: "100%",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center"
    }
  }
}));

export default function Log({ baseURL }) {
  const classes = useStyles();
  const [log, setLog] = React.useState(null);

  React.useEffect(() => {
    async function getLog() {
      try {
        const url = `${baseURL}/api/log?baseURL=${baseURL}`;
        const response = await axios.get(url);
        setLog(response.data.log);
        console.log(response.data.log.length);
      }
      catch (error) {
        console.log(error);
      }
    }

    getLog();
  }, []);

  return (
    <Container>
      <Grid className={classes.grid} container spacing={5}>
        <Grid item xs={12} sm={3} md={2} className={classes.header}>
          <Navbar />
        </Grid>
        <Grid className={classes.main} item xs={12} sm={9} md={10}>
          <div style={{ display: 'flex', alignItems: "center", width: "95%" }}>
            <img className={classes.backButton} src="/back.png" style={{ width: "30px", height: "30px", marginRight: "20px", cursor: "pointer" }} onClick={() => Router.push('/')} />
            <h1 style={{ color: '#7e7e7e', fontFamily: 'Segoe UI', marginTop: "20px", marginBottom: '20px', textAlign: "left" }}>Log</h1>
          </div>
          <Paper className={classes.paper}>
            <List className={classes.list}>
              {
                log
                  ? log.map((line, key) => (
                    <ListItem key={key} style={{ paddingBottom: "20px", display: "flex", alignItems: "flex-start" }}>
                      <div className={classes.item} style={{ marginRight: "40px", width: "150px" }}>{line[0]}</div>
                      <div className={classes.item} style={{ marginRight: "0px", width: "60%", wordWrap: "break-word" }}>{line[1]}</div>
                      {line[2] === 'ERROR' ? <div className={classes.bar} /> : <div className={classes.bar} style={{ backgroundColor: "#00e061" }} />}
                    </ListItem>
                  ))
                  : <>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                      <div className={classes.greyBar}><PulseBar /></div>
                    </ListItem>
                  </>
              }
            </List>
          </Paper>
          <Paper className={classes.paperMobile}>
            <List className={classes.list}>
              {
                log
                  ? log.map((line, key) => (
                    <ListItem key={key} style={{ paddingBottom: "20px", display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                      <div className={classes.item} style={{ width: "100%", marginBottom: "10px" }}>{line[1]}</div>
                      <div style={{ paddingBottom: "20px", display: "flex" }}>
                        <div className={classes.item} style={{ marginRight: "140px" }}>{line[0]}</div>
                        {line[2] === 'ERROR' ? <div className={classes.bar} /> : <div className={classes.bar} style={{ backgroundColor: "#00e061" }} />}
                      </div>

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
        </Grid>
      </Grid>
    </Container >
  );
}
