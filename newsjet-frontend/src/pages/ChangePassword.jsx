import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SnackAlert from "../components/SnackAlert";

const API_URL = import.meta.env.VITE_API_URL;
const PASSWORD_REGEX = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/

export default function ChangePassword() {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [snackType, setSnackType] = React.useState("");
  const [snackMessage, setSnackMessage] = React.useState("");
  const [oldPasswordVal, setOldPasswordVal] = React.useState(false);
  const [passwordVal, setPasswordVal] = React.useState(false);
  const [confirmPasswordVal, setConfirmPasswordVal] = React.useState(false);  
  const navigate = useNavigate();

  //Delay utility function by Etienne Martin on https://stackoverflow.com/a/47480429
  const delay = ms => new Promise(res => setTimeout(res, ms));
  
  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log(PASSWORD_REGEX.test(data.get("password")) ? "yes": "no")
    let success = false;
    setConfirmPasswordVal(false);
    setOldPasswordVal(false);
    setPasswordVal(false);

    if (data.get("password") != data.get("confirm-password")) {
        setConfirmPasswordVal(true);
    }
    if (!PASSWORD_REGEX.test(data.get("password"))) {
        setPasswordVal(true);
    } 
    if (data.get("password") == data.get("confirm-password") && PASSWORD_REGEX.test(data.get("password"))) {
        await axios
      .patch(API_URL + "/users/updatepassword", {
        id: parseInt(sessionStorage.getItem("userid"), 10),
        oldpassword: data.get("old-password"),
        password: data.get("password"),
        confirmPassword: data.get("confirm-password")
      })
      .then(function (response) {
        console.log(response.data);
        setConfirmPasswordVal(false);
        setOldPasswordVal(false);
        setPasswordVal(false);

        setSnackMessage("Password updated! Going back to homepage...");
        setSnackType("success");
        setOpenSnack(true);
        //changeLogin(true);
        success = true;
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.data.message == "Incorrect old password") {
            setOldPasswordVal(true);
        } else {
            setSnackMessage("Couldn't update password.");
            setSnackType("error");
            setOpenSnack(true);
        }
      });
      
      if (success) {
        await delay(3000);
        navigate("/");
      }
    }
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
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EnhancedEncryptionIcon />
        </Avatar>
        <Typography align="center" component="h1" variant="h5">
          Welcome, {sessionStorage.getItem("username")}! <br/>You can change your password here.
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            name="old-password"
            label="Old password"
            type="password"
            id="old-password"
            autoComplete="old-password"
            autoFocus={true}
            error={oldPasswordVal}
            helperText={oldPasswordVal ? "Incorrect password" : ""}
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
            error={passwordVal}
            helperText={passwordVal ? "New password must have upper and lowercase letters, numbers, a special character and be at least 8 characters long" : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"
            error={confirmPasswordVal}
            helperText={confirmPasswordVal ? "Doesn't match new password" : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
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
