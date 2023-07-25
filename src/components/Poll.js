import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import { Avatar, Box, ButtonGroup } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Error404 from "./Error404";

const Poll = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const authedUser = useSelector((state) => state.authedUser);

  const authorName = users[questions[id]?.author]?.name;
  const userAnswer = users[authedUser?.id]?.answers[id];
  const [answer, setAnswer] = useState(userAnswer);
  const initialVoteCount = {
    optionOne: questions[id]?.optionOne?.votes?.length,
    optionTwo: questions[id]?.optionTwo?.votes?.length,
  };
  const [voteCount, setVoteCount] = useState(initialVoteCount);

  if (!questions[id]) {
    return <Error404 />;
  }
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
        <h1>Poll posted by {authorName}</h1>
        {users[questions[id].author].avatarURL ? (
          <Avatar
            src={users[questions[id].author].avatarURL}
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          <Avatar sx={{ bgcolor: deepOrange[500], width: 100, height: 100 }}>
            {users[questions[id].author].name.split(" ")[0][0]}
            {users[questions[id].author].name.split(" ")[1][0]}
          </Avatar>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <h2>Would you rather?</h2>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => {
              if (answer) return;
              dispatch(handleAddAnswer(id, "optionOne"));
              setAnswer("optionOne");
              setVoteCount((prev) => ({
                ...prev,
                optionOne: prev.optionOne + 1,
              }));
            }}
            color={answer === "optionOne" ? "success" : "primary"}
          >
            {questions[id].optionOne.text}
            {userAnswer && (
              <span>
                votes: {voteCount.optionOne} (
                {(
                  (voteCount.optionOne /
                    (voteCount.optionOne + voteCount.optionTwo)) *
                  100
                ).toFixed(2)}{" "}
                %)
              </span>
            )}
          </Button>
          <Button
            onClick={() => {
              if (answer) return;
              dispatch(handleAddAnswer(id, "optionTwo"));
              setAnswer("optionTwo");
              setVoteCount((prev) => ({
                ...prev,
                optionTwo: prev.optionTwo + 1,
              }));
            }}
            color={answer === "optionTwo" ? "success" : "primary"}
          >
            <span>{questions[id].optionTwo.text}</span>
            {userAnswer && (
              <span>
                votes: {voteCount.optionTwo} (
                {(
                  (voteCount.optionTwo /
                    (voteCount.optionOne + voteCount.optionTwo)) *
                  100
                ).toFixed(2)}{" "}
                %)
              </span>
            )}
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};
export default Poll;
