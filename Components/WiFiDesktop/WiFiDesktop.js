import React, { useState } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import getBaseURL from '../../utils/baseURL';
import Paper from "@material-ui/core/Paper";
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
    display: "flex",
    justifyContent: "center",
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
    fontFamily: "Segoe UI",
    [theme.breakpoints.down("sm")]: {
      width: "20rem",
    },
  },
  INPUT: {
    marginLeft: "3rem",
  },
  Label: {
    fontFamily: "Segoe UI Semibold",
    marginLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
    },
  },
  listItem: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    padding: "20px"
  },
  listBox: {
    borderTop: "0",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%"
  },
  text: {
    marginTop: "60px",
    fontFamily: "Segoe UI",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "60px"
  },
  grey: {
    color: "#7e7e7e",
    margin: "0"
  },
  someItem: {
    width: "100%",
    justifyContent: "center"
  },
}));

const INIT_STATE = [{ name: "SSID1" }, { name: "SSID2" }, { name: "SSID3" }];

export default function WiFiDesktop({ baseURL }) {
  const [data, setData] = useState(null);
  const [connect, setConnect] = React.useState('Connect');
  const [scan, setScan] = React.useState('Tap to Scan');

  const classes = useStyles();

  const handleChange = (event) => {
    const { id } = event.target;
    const ssid_name = id.split('-')[0];

    //set password with corresponding ssid in state
    const new_data = data.map((ssid) => {
      return ssid.name === ssid_name
        ? { name: ssid_name, password: event.target.value }
        : { name: ssid.name };
    })

    //clear any other passwords that have been inputted by user
    data.forEach(ssid => {
      if (ssid.name != ssid_name)
        document.getElementById(`${ssid.name}-pwd`).value = '';
    })

    setData(new_data);
  }

  const scanWifi = async () => {
    try {
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

  const connectWifi = async () => {
    try {
      setConnect('Connecting...');
      const ssid = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].password) {
          ssid.push(data[i].name);
          ssid.push(data[i].password);
        }
      }

      if (ssid.length == 0) {
        alert('You did not enter a password for any SSID.');
        setConnect('Connect')
        return;
      }

      const url = `${baseURL}/api/connect_wifi`;
      const payload = { name: ssid[0], password: ssid[1] };
      const response = await axios.post(url, payload);
      alert(response.data.message);
      setConnect('Connected!')
      setTimeout(() => setConnect('Connect'), 2000);
    }
    catch (error) {
      console.log(error);
      setConnect('Unable to Connect');
      setTimeout(() => setConnect('Connect'), 2000);
    }
  }

  return (
    <div className={classes.box}>

      <Paper>
        <ListItem divider
          className={classes.someItem}
          style={{ padding: "0" }}
        >
          <Button
            className={classes.button}
            onClick={scanWifi}
          >
            {scan}
          </Button>
          {
            data
              ? <Button
                onClick={connectWifi}
                className={classes.button}
                style={{borderLeft: "1px solid #c8c8c8"}}
              >
                {connect}
              </Button>
              : null
          }
        </ListItem>



        {data ?
          <div className={classes.listBox}>
            {
              connect != 'Connecting...'
                ? data ? data.map((ssid, key) => (
                  <div
                    className={classes.listItem}
                    key={key}
                  >
                    <div id={`${ssid.name}-label`} className={classes.Label}>
                      {ssid.name}
                    </div>
                    <div style={{ position: 'absolute', top: '-4px', left: '35%', padding: "20px" }}>
                      <Input
                        id={`${ssid.name}-pwd`}
                        className={classes.INPUT}
                        disableUnderline={true}
                        placeholder="Enter Password"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ))
                  : null
                : <div className={classes.text}>
                  <p className={classes.grey}>Attempting to Connect.</p>
                  <p className={classes.grey}>This can take about 20 seconds</p>
                  <p className={classes.grey} style={{ marginTop: "20px" }}><b>If the connection succeeds you'll receive</b></p>
                  <p className={classes.grey}><b>an email with the link to this app</b></p>
                  <p className={classes.grey} style={{ marginTop: "20px" }}>If the device fails to connect, the hotspot will remain active</p>
                  <p className={classes.grey}>and you can attempt to connect again through this page</p>
                </div>
            }
          </div>
          : null
        }
      </Paper>
    </div>
  );
}
