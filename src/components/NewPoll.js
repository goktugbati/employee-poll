import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const NewPoll = ({ dispatch }) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (optionOne === "" || optionTwo === "") {
      alert("Please enter both options");
      return;
    }
    dispatch(handleAddQuestion(optionOne, optionTwo));
    navigate("/");
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <h1>New Poll</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="First Option"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Second Option"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default connect()(NewPoll);
