import * as React from "react";
import { connect } from "react-redux";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PollCard from "./PollCard";
import { useState } from "react";

const Dashboard = ({ authedUser, questions, users }) => {
  const [displayPolls, setDisplayPolls] = useState("unanswered");

  const answered = Object.values(questions)
    .filter((poll) => {
      return (
        poll.optionOne.votes.includes(authedUser.id) ||
        poll.optionTwo.votes.includes(authedUser.id)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((poll) => {
      return (
        !poll.optionOne.votes.includes(authedUser.id) &&
        !poll.optionTwo.votes.includes(authedUser.id)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  console.log("Answered Questions:", answered);
  console.log("Unanswered Questions:", unanswered);

  const handleChange = (e, displayPolls) => {
    e.preventDefault();
    console.log(displayPolls);
    setDisplayPolls(displayPolls);
  };

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
        <ToggleButtonGroup
          color="primary"
          value={displayPolls}
          onChange={handleChange}
          exclusive
        >
          <ToggleButton value="unanswered">Unanswered Polls</ToggleButton>
          <ToggleButton value="answered">Answered Polls</ToggleButton>
        </ToggleButtonGroup>
        {displayPolls === "answered"
          ? answered.map((question) => (
              <PollCard question={question} user={users[question.author]} />
            ))
          : unanswered.map((question) => (
              <PollCard question={question} user={users[question.author]} />
            ))}
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Dashboard);
