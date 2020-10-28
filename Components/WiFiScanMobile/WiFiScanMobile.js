import axios from 'axios';
import React, { useState } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Router from 'next/router';
import getBaseURL from '../../utils/baseURL';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  item: {
    margin: '1.2rem',
  },
  button: {
    borderRadius: "0px",
    color: "#7e7e7e",
    overflowY: "auto",
    backgroundColor: "transparent",
    width: "100% !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontFamily: "Roboto",
  },
  paper: {
    padding: "40px",
    textAlign: "left",
    width: "78%",
    height: "555px",
    overflowY: "auto",
    fontFamily: "Roboto",
    fontSize: "20px",
    marginTop: '20px',
    color: "#7e7e7e",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
  },
  backButton: {
  },
  main: {
    padding: "4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },
  },
  list: {

  }
}));

// const INIT_STATE = [{ name: "SSID1" }, { name: "SSID2" }, { name: "SSID3" }];

export default function WiFiScanMobile({ baseURL }) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [scan, setScan] = useState('Tap to Scan');

  const scanWifi = async () => {
    try {
      //store this url in an env file
      setScan('Scanning...');
      const url = `${baseURL}/api/scan_wifi`;
      const response = await axios.get(url);
      const { ssid_list } = response.data;
      setData(ssid_list);
      setScan('Tap to Scan');
    }
    catch (error) {
      console.log(error);
      setScan('Unable to Scan');
      setTimeout(() => setScan('Tap to Scan'), 2000);
    }
  };

  return (
    <Grid className={classes.main}>
      <Container>
        <div style={{ display: 'flex', alignItems: "center", width: "95%" }}>
          <img className={classes.backButton} src="/back.png" style={{ width: "30px", height: "30px", marginRight: "20px", cursor: "pointer" }} onClick={() => Router.push('/')} />
          <h1 style={{ color: '#7e7e7e', fontFamily: 'Roboto', marginTop: "20px", marginBottom: '20px', textAlign: "left" }}>Wifi</h1>
        </div>

        <Paper>
          <ListItem divider>
            <Button onClick={scanWifi} className={classes.button}>{scan}</Button>
          </ListItem>
          <List component="nav" className={classes.list}>
            {data ? data.map((ssid, key) => (
              <ListItem onClick={() => Router.push({ pathname: '/connect', query: { ssid: ssid.name } })} button divider style={{justifyContent: "center"}}>
                <ListItemText className={classes.item}>{ssid.name}</ListItemText>
              </ListItem>
            )) : null}
          </List>
        </Paper>
      </Container>
    </Grid>
  );
}
