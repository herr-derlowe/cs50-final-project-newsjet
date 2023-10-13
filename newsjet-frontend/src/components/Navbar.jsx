import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import '../navbargradient.css';

export default function Navbar({logged, changeLogin}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleLogOut = () => {
    handleClose();
    sessionStorage.clear();
    changeLogin(false);
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <NewspaperIcon
            fontSize="large"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              flexGrow: 0,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NewsJet
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* -webkit-linear-gradient(45deg, #2196f3 30%, #21f364 90%) */}
            {logged ? (
              <Button
              //onClick={handleCloseNavMenu}
              component={Link}
              to='/favorites'
              color="inherit"
              sx={{fontWeight: 'bold', fontSize: 15}}>
                FAVORITES
              </Button>
            ) : (<></>)}
            &nbsp;&nbsp;<Button
              //onClick={handleCloseNavMenu}
              className="cs50button"
              component={Link}
              to='/cs50x'
              color="inherit"
              sx={{fontWeight: 'bold', fontSize: 15, WebkitTextFillColor: "black" }}>
                CS50x
              </Button>
          </Box>
          {logged ? (
            <div>
              <Tooltip title={sessionStorage.getItem("username")}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/password">Change password</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button component={Link} to="/register" color="inherit">Register</Button>
              <Button component={Link} to="/login" color="inherit">Login</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
