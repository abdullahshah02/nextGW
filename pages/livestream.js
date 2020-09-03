import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "../Components/Navigation/Navbar";
import Container from "@material-ui/core/Container";
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
    width: "70%",
    fontFamily: "Segoe UI",
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
    padding: "0rem",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem",
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
  video: {
    width: "100%",
    height: "85.5%",
    padding: theme.spacing(2),
    backgroundColor: "#dae3f0",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "17px",
    [theme.breakpoints.down("xs")]: {
      height: '250px',
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
  },
  backButton: {
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    },
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

export default function Livestream({ baseURL }) {
  const classes = useStyles();
  const [time, setTime] = React.useState(Date.now());
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2500)
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => { clearInterval(interval); }
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
            <h1 style={{ color: '#7e7e7e', fontFamily: 'Segoe UI', marginTop: "20px", marginBottom: '20px', textAlign: "left" }}>Live</h1>
          </div>
          <div className={classes.video}>
            {
              !loading
                ? <img src={`${baseURL}5/run/pikrellcam/mjpeg.jpg?${time}`} style={{ width: "100%", height: "100%" }} onLoad={() => setLoading(false)} />
                : <div className={classes.videoLoader}><img src="/logo.png" alt="logo" style={{ width: "100px", borderRadius: "50%", boxShadow: "0px 5px 10px #a0a0a0", }} /></div>

            }
          </div>
        </Grid>
      </Grid>
    </Container >
  );
}
