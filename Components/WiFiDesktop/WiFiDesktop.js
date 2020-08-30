import React, { useState } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import getBaseURL from '../../utils/baseURL';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
    border: "1px solid #7e7e7e",
    borderTop: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%"
  }
}));

// const INIT_STATE = [{ name: "SSID1" }, { name: "SSID2" }, { name: "SSID3" }];

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
      document.getElementById('scan-button-container').style.display = 'none';
      document.getElementById('connect-button-container').style.display = 'block';
      document.getElementById('back-button-container').style.display = 'block';
      setScan('Tap to Scan');
    }
    catch (error) {
      console.log(error);
      setScan('Unable to Scan');
      setTimeout(() => setScan('Tap to Scan'), 2000);
    }
  };

  const backToScan = () => {
    setData([]);
    document.getElementById('scan-button-container').style.display = 'block';
    document.getElementById('connect-button-container').style.display = 'none';
    document.getElementById('back-button-container').style.display = 'none';
  }

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
        return;
      }

      const url = `${baseURL}/api/connect_wifi`;
      const payload = { name: ssid[0], password: ssid[1] };
      const response = await axios.post(url, payload);
      alert(response.data.message);
      etConnect('Connected!')
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

      <div id="scan-button-container">
        <Button
          className={classes.button}
          onClick={scanWifi}
        >
          {scan}
        </Button>
      </div>

      <div id="connect-button-container" style={{ display: 'none' }}>
        <Button
          onClick={connectWifi}
          className={classes.button}
        >
          {connect}
        </Button>
      </div>

      <div id="back-button-container" style={{ display: 'none' }}>
        <Button
          onClick={backToScan}
          className={classes.button}
        >
          BACK
        </Button>
      </div>

      {data ?
        <div className={classes.listBox}>
          {
            data ? data.map((ssid, key) => (
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
          }
        </div>
        : null
      }

    </div>
  );
}
