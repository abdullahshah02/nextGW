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

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: "34px 0",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "78%",
    fontFamily: "Segoe UI",
    fontSize: "20px",
    marginTop: '20px',
    color: "#7e7e7e",
    backgroundColor: "#fff",
    borderRadius: "10px",
    //boxShadow: "5px 6px 13px  grey",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4),
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
  box: {
    border: "1px ",
    boxShadow: "1px 1px 4px grey",
    backgroundColor: "#f2f2f2",
    borderRadius: "1rem",
    height: "23rem",
    width: "30rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
    },
  },
  header: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
  },
  heading: {
    color: '#7e7e7e',
    fontWeight: 'bold',
    fontFamily: 'Segoe UI',
    margin: '0',
    width: '100%',
    textAlign: 'left',
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "#dae3f0",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "60px",
      marginBottom: "-30px",
      zIndex: "5"
    },
  },
  backButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
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
        console.log(log);
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
            <h1 style={{ color: '#7e7e7e', fontFamily: 'Segoe UI', marginTop: "20px", marginBottom: '20px', textAlign: "left"}}>Log</h1>
          </div>
          <Paper className={classes.paper}>
            <List className={classes.root}>
              {
                log
                  ? log.map((line, key) => (
                    <ListItem button divider key={key}>
                      <ListItemText className={classes.item}>{line.join(' - ')}</ListItemText>
                    </ListItem>
                  ))
                  : null
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container >
  );
}
