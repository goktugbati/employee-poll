import * as React from "react";
import { connect } from "react-redux";
import { Box } from "@mui/material";
import PollCard from "./PollCard";

const Dashboard = ({ authedUser, questions, users }) => {
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
        <h1>Answered Questions</h1>
        {answered.map((question) => (
          <PollCard question={question} user={users[question.author]} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <h1>Unanswered Questions</h1>
        {unanswered.map((question) => (
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
