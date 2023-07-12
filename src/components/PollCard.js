import React from 'react';
import {Avatar, Box, Card, Link, ListItemText, Typography} from "@mui/material";
import Button from "@mui/material/Button";

const PollCard = ({question, user}) => {
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#E59866',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Card key={question.id} sx={{ width: '20%', marginBottom: 2 }}>
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
                {user.avatarURL?
                    <Avatar src={user.avatarURL} />:
                    <Avatar {...stringAvatar(user.name)} />
                }
                <ListItemText
                    sx={{padding: 2}}
                    primary={question.author}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline'}}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                               {new Date(question.timestamp).toLocaleDateString()}
                            </Typography>
                            <Box sx={{padding: 1 }}>
                                <a href={`/question/${question.id}`}>
                                    Details
                                </a>
                            </Box>
                        </React.Fragment>
                    }
                />
            </Box>
        </Card>
    );
};

export default PollCard;
