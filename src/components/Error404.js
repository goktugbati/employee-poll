import { connect } from "react-redux";
import { Box, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import React from "react";

const Error404 = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Typography component="div" color="error" fontSize={50}>
          Error 404
        </Typography>
        <Typography component="div" color="error" fontSize={30} paddingTop={10}>
          Page Not Found
        </Typography>

        <Button sx={{ paddingTop: 5 }}>
          <Link
            component={RouterLink}
            fontSize={30}
            to={"/"}
            underline="always"
          >
            Go To Home Page
          </Link>
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ authUser }) => ({
  loggedIn: !!authUser,
});

export default connect(mapStateToProps)(Error404);
