import React from "react";
import { Avatar, Box, CssBaseline, Link, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { connect, useSelector } from "react-redux";
import { logoutAuthedUser } from "../actions/authedUser";
import { Link as RouterLink } from "react-router-dom";

const Nav = ({ dispatch, authedUser, users }) => {
  const state = useSelector((state) => state);

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: "#E59866",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  return (
    <div>
      {/*<CssBaseline />*/}
      <AppBar component="nav" sx={{ zIndex: 9999 }}>
        <Toolbar>
          {users[authedUser.id].avatarURL ? (
            <Avatar src={users[authedUser.id].avatarURL} />
          ) : (
            <Avatar {...stringAvatar(authedUser.name)} />
          )}

          <Typography
            spacing={50}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              padding: 1,
            }}
          >
            {authedUser ? authedUser.id : ""}
          </Typography>
          <Typography
            spacing={100}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              padding: 1,
            }}
            id="userName"
          >
            {authedUser ? authedUser.name : ""}
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button>
              <Link
                component={RouterLink}
                style={{ color: "#fff" }}
                variant="body1"
                to={"/"}
              >
                Home
              </Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link
                component={RouterLink}
                style={{ color: "#fff" }}
                variant="body1"
                to={"/leaderboard"}
              >
                Leaderboard
              </Link>
            </Button>
            <Button sx={{ color: "#fff" }}>
              <Link
                component={RouterLink}
                style={{ color: "#fff" }}
                variant="body1"
                to={"/add"}
              >
                New Poll
              </Link>
            </Button>
            <Button>
              <Link
                component={RouterLink}
                sx={{ color: "#fff" }}
                to="/login"
                onClick={() => dispatch(logoutAuthedUser())}
                variant="body1"
              >
                Logout
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
