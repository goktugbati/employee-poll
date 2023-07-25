import { connect, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/authedUser";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const loggedIn = useSelector((state) => !!state.authedUser);
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    username: "tylermcginnis",
    password: "abc321",
  });
  const [error, setError] = useState("");

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    console.log(redirectUrl);
    if (redirectUrl) {
      return <Navigate to={redirectUrl} />;
    } else {
      return <Navigate to="/" />;
    }
  }

  const handleUsername = (e) =>
    setCredentials({
      ...credentials,
      username: e.target.value,
    });

  const handlePassword = (e) =>
    setCredentials({
      ...credentials,
      password: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = dispatch(handleLogin(credentials));
    if (!res) {
      setError("Invalid username or password");
    }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            value={credentials.username}
            margin="normal"
            required
            fullWidth
            name="username"
            data-testid="username"
            label="Username"
            autoComplete="username"
            onChange={handleUsername}
            autoFocus
          />
          <TextField
            value={credentials.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            data-testid="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            data-testid="submit-button"
          >
            Sign In
          </Button>
        </Box>
        {error && (
          <Typography
            component="h1"
            variant="h5"
            color="red"
            data-testid="error-message"
          >
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;
