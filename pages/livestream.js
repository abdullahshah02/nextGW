import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Navbar from "../Components/Navigation/Navbar";
import Container from "@material-ui/core/Container";

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
}));

export default function Livestream({ baseURL }) {
  const classes = useStyles();
  const [time, setTime] = React.useState(Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 500);
    return () => { clearInterval(interval); }
  }, []);

  return (
    <Container>
      <Grid className={classes.grid} container spacing={5}>
        <Grid item xs={12} sm={3} md={2}>
          <Navbar />
        </Grid>
        {
          baseURL
            ? (
              <Grid className={classes.main} item xs={12} sm={8} md={10}>
                <img src={`${baseURL}/mjpeg_read.php?${time}`} width="90%" />
              </Grid>
            )
            : null
        }
      </Grid>
    </Container>
  );
}
