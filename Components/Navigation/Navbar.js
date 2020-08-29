import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "40px",
    [theme.breakpoints.down("xs")]: {
      paddingTop: "0px"
    },
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "row",
    },
  },
  PaperDesk: {
    padding: theme.spacing(2),
    height: "8.5rem",
    width: "5.5rem",
    textAlign: "center",
    fontFamily: "Segoe UI ",
    fontSize: "16px",
    color: "#7e7e7e",
    backgroundColor: "#dae3f0",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4),
      fontSize: "24px",
      display: "none",
    },
  },
  PaperMob: {
    height: "12rem",
    width: "8rem",
    display: "none",
    padding: theme.spacing(2),
    textAlign: "center",
    fontFamily: "Segoe UI ",
    fontSize: "20px",
    color: "#7e7e7e",
    backgroundColor: "#dae3f0",
    borderRadius: "8px",
    //boxShadow: "5px 6px 13px  grey",
    cursor: "pointer",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(4),
      fontSize: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  Img: {
    height: "5rem",
    width: "4.5rem",
    marginBottom: "10px"
  },
  Centerbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid className={classes.Centerbox} item xs={6} sm={12}>
          <Paper
            onClick={() => Router.push("/")}
            className={classes.PaperDesk}
          >
            <img
              className={classes.Img}
              src="/wifi_vectorized.png"
              alt="WiFi Logo"
            />
            WIFI
          </Paper>
          <Paper
            onClick={() => Router.push("/wifi")}
            className={classes.PaperMob}
          >
            <img
              className={classes.Img}
              src="/wifi_vectorized.png"
              alt="WiFi Logo"
            />
            WIFI
          </Paper>
        </Grid>
        <Grid className={classes.Centerbox} item xs={6} sm={12}>
          <Paper
            className={classes.PaperDesk}
            onClick={() => Router.push("/videos")}
          >
            <img
              className={classes.Img}
              src="/video.png"
              alt="Video Logo"
              style={{height: '4rem', width: '4rem', marginTop: '10px'}}
            />
            VIDEOS
          </Paper>
          <Paper
            className={classes.PaperMob}
            onClick={() => Router.push("/videos")}
          >
            <img
              className={classes.Img}
              src="/video.png"
              alt="Video Logo"
              style={{height: '4rem', width: '4rem', marginTop: '10px'}}
            />
            VIDEOS
          </Paper>
        </Grid>
        <Grid className={classes.Centerbox} item xs={6} sm={12}>
          <Paper
            onClick={() => Router.push("/livestream")}
            className={classes.PaperDesk}
          >
            <img
              className={classes.Img}
              src="/live.webp"
              alt="Live"
              style={{height: '3rem', width: '7rem', marginTop: '18px'}}
            />
            LIVE
          </Paper>
          <Paper
            onClick={() => Router.push("/livestream")}
            className={classes.PaperMob}
          >
            <img
              className={classes.Img}
              src="/live.webp"
              alt="Live"
              style={{height: '3rem', width: '7rem', marginTop: '18px'}}
            />
            LIVE
          </Paper>
        </Grid>
        <Grid className={classes.Centerbox} item xs={6} sm={12}>
          <Paper
            onClick={() => Router.push("/log")}
            className={classes.PaperDesk}
          >
            <img
              className={classes.Img}
              src="/log.webp"
              alt="Log"
            />
            LOG
          </Paper>
          <Paper
            onClick={() => Router.push("/log")}
            className={classes.PaperMob}
          >
            <img
              className={classes.Img}
              src="/log.webp"
              alt="Log"
            />
            LOG
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
