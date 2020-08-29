import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "../Navigation/Navbar";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import WiFiDesktop from "../WiFiDesktop/WiFiDesktop";

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
    width: "70%",
    fontFamily: "Segoe UI ",
    fontSize: "20px",
    color: "#7e7e7e",
    backgroundColor: "#dae3f0",
    borderRadius: "8px",
    //boxShadow: "5px 6px 13px  grey",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4),
      fontSize: "24px",
      width: "69%",
      height: "20px",
    },
  },
  main: {
    padding: "4rem",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  offline: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  offlinePaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    width: "70%",
    fontFamily: "Segoe UI ",
    fontSize: "20px",
    color: "#7e7e7e",
    backgroundColor: "#dae3f0",
    borderRadius: "8px",
    //boxShadow: "5px 6px 13px  grey",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "24px",
      width: "88%",
      height: "50px",
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
  WiFi: {
    padding: "1rem 5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  dot: {
    height: "10px",
    width: "10px",
    backgroundColor: "#ff0000",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: "10px",
  }
}));

export default function FullWidthGrid({ baseURL }) {
  const classes = useStyles();

  return (
    <Container>
      <Grid className={classes.grid} container spacing={5}>
        <Grid item xs={12} sm={3} md={2}>
          <Navbar />
        </Grid>
        <Grid className={classes.main} item xs={12} sm={6} md={8}>
          <div>
            <h1
              style={{
                marginBottom: "60px",
                color: "#7e7e7e",
                fontWeight: "bold",
                fontFamily: "Segoe UI ",
              }}
            >
              WiFi
            </h1>
            <WiFiDesktop baseURL={baseURL} />
          </div>

        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Grid item xs={12}>
            <h1 className={classes.typo}>Home</h1>
          </Grid>
          <Grid className={classes.offline} item xs={12}>
            {baseURL === "http://192.168.50.5:3000"
              ? <Paper className={classes.offlinePaper}><div className={classes.dot} />Offline</Paper>
              : <Paper className={classes.offlinePaper}><div className={classes.dot} style={{ backgroundColor: "#32CD32" }} />Online</Paper>
            }


          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
