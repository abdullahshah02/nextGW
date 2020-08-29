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

const useStyles = makeStyles((theme) => ({
  item: {
    margin: '1.2rem',
  },
  button: {
    border: "1px solid #7e7e7e",
    color: "#7e7e7e",
    overflowY: "auto",
    borderRadius: "0",
    backgroundColor: "transparent",
    width: "100.3% !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontFamily: "Segoe UI",
  },
  backButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
  },
  main: {
    padding: "4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },
  },
}));

export default function WiFiScanMobile({ baseURL }) {
  const classes = useStyles();
  const [data, setData] = useState([]);

  const scanWifi = async () => {
    try {
      //store this url in an env file
      const url = `${baseURL}/api/scan_wifi`;
      const response = await axios.get(url);
      const { ssid_list } = response.data;
      setData(ssid_list);
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid className={classes.main}>
    <Container>
      <div style={{ display: 'flex', alignItems: "center", width: "95%" }}>
        <img className={classes.backButton} src="/back.png" style={{ width: "30px", height: "30px", marginRight: "20px", cursor: "pointer" }} onClick={() => Router.push('/')} />
        <h1 style={{ color: '#7e7e7e', fontFamily: 'Segoe UI', marginTop: "20px", marginBottom: '20px', textAlign: "left" }}>Wifi</h1>
      </div>
      <List component="nav">
        <Button onClick={scanWifi} className={classes.button}>Scan</Button>
        {data.map((ssid, key) => (
          <ListItem onClick={() => Router.push({ pathname: '/connect', query: { ssid: ssid.name } })} button divider>
            <ListItemText className={classes.item}><span style={{ fontFamily: 'Segoe UI Semibold' }}>{ssid.name}</span></ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
    </Grid>
  );
}
