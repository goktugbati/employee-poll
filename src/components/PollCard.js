import React from "react";
import {
  Avatar,
  Box,
  Card,
  Link,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import { deepOrange } from "@mui/material/colors";

const PollCard = ({ question, user }) => {
  return (
    <Card key={question.id} sx={{ width: "20%", marginBottom: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          width: "100%",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        {user?.avatarURL ? (
          <Avatar src={user.avatarURL} />
        ) : (
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user.name.split(" ")[0][0]}
            {user.name.split(" ")[1][0]}
          </Avatar>
        )}
        <ListItemText
          sx={{ padding: 2 }}
          primary={question.author}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body1"
                color="text.primary"
              >
                {new Date(question.timestamp).toLocaleDateString()}
              </Typography>
              <Box sx={{ padding: 1 }}>
                <Button>
                  <Link
                    component={RouterLink}
                    variant="body2"
                    to={`/questions/${question.id}`}
                  >
                    Details
                  </Link>
                </Button>
              </Box>
            </React.Fragment>
          }
        />
      </Box>
    </Card>
  );
};

export default PollCard;
