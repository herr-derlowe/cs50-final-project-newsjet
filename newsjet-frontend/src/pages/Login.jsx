import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SnackAlert from "../components/SnackAlert";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login({ changeLogin }) {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackType, setSnackType] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");

  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get("username"),
    //   password: data.get("password"),
    // });
    await axios
      .post(API_URL + "/users/login", {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then(function (response) {
        //console.log(response.data);
        sessionStorage.setItem("username", response.data.username);
        sessionStorage.setItem("userid", response.data.userid);
        //console.log(sessionStorage.getItem("username"));
        changeLogin(true);
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        setSnackMessage("Username or password is incorrect");
        setSnackType("error");
        setOpenSnack(true);
      });
  };
  const closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <SnackAlert
        open={openSnack}
        handleClose={closeSnack}
        type={snackType}
        message={snackMessage}
      />
    </Container>
  );
}
