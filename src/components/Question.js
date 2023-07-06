import React from 'react';
import {Avatar, Box, Card, ListItemText, Typography} from "@mui/material";

const Question = ({question, user}) => {
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#E59866',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Card key={question.id} sx={{ width: '40%', marginBottom: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    width: '100%',
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <Avatar {...stringAvatar(user)} />
                <ListItemText
                    sx={{padding: 2}}
                    primary="Would you rather?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {question.optionOne.text}
                                <br />
                            </Typography>
                            <Typography
                                sx={{ display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {question.optionTwo.text}
                            </Typography>
                        </React.Fragment>
                    }
                />
                <Box sx={{ textAlign: 'center', padding: 2 }}>
                    <a href={`/question/${question.id}`}>
                        Go to Question
                    </a>
                </Box>
            </Box>
        </Card>
    );
};

export default Question;
