import axios from 'axios';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    margin: "1.2rem",
  },
  button: {
    color: "#7e7e7e",
    overflowY: "auto",
    borderRadius: "0px",
    backgroundColor: "transparent",
    width: "100% !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontFamily: "Segoe UI",
  },
  backButton: {
    // display: "none",
    // [theme.breakpoints.down("xs")]: {
    //   display: "block"
    // },
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
  main: {
    padding: "4rem",
    [theme.breakpoints.down("sm")]: {
      padding: "2rem",
    },
  },
  INPUT: {
    width: "100%",
    height: "100px",
    fontSize: "20px",
    paddingLeft: "20px"
  },
  text: {
    paddingTop: "60px",
    paddingBottom: "60px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontFamily: "Segoe UI",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderTop: "0"
  },
  grey: {
    color: "#7e7e7e",
    margin: "0",
    textAlign: "center"
  }
}));

const Connect = ({ baseURL }) => {
  const classes = useStyles();
  const router = useRouter();
  const { ssid } = router.query;
  const [connect, setConnect] = React.useState('Connect');

  const connectWifi = async () => {
    try {
      setConnect('Connecting...');
      const password = document.getElementById('password').value;
      const url = `${baseURL}/api/connect_wifi`;
      const payload = { name: ssid, password: password };
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
    ssid
      ? <Container className={classes.main}>
        <div style={{ display: 'flex', alignItems: "center", width: "95%" }}>
          <img className={classes.backButton} src="/back.png" style={{ width: "30px", height: "30px", marginRight: "20px", cursor: "pointer" }} onClick={() => router.push('/wifi')} />
          <h1 style={{ color: '#7e7e7e', fontFamily: 'Segoe UI', marginTop: "20px", marginBottom: '20px', textAlign: "left" }}>Wifi</h1>
        </div>
        <Paper>
          <ListItem divider>
            <Button className={classes.button}>
              {ssid}
            </Button>
          </ListItem>

          <ListItem divider>
            <Input
              id="password"
              className={classes.INPUT}
              disableUnderline={true}
              placeholder="Enter Password"
            />
          </ListItem>
          <Button
            className={classes.button}
            onClick={connectWifi}
          >
            {connect}
          </Button>

          {
            connect === 'Connecting...'
              ? <div className={classes.text}>
                <p className={classes.grey}>Attempting to Connect.</p>
                <p className={classes.grey}>This can take about 20 seconds</p>
                <p className={classes.grey} style={{ marginTop: "20px" }}><b>If the connection succeeds you'll receive</b></p>
                <p className={classes.grey}><b>an email with the link to this app</b></p>
                <p className={classes.grey} style={{ marginTop: "20px" }}>If the device fails to connect, the hotspot will remain active and you can attempt to connect again through this page</p>
              </div>
              : null
          }
        </Paper>
      </Container>
      : null
  );
};
export default Connect;
