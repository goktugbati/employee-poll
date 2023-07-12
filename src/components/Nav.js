import React from 'react';
import {Avatar, Box, CssBaseline, Link, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {connect} from "react-redux";

const Nav = ({authedUser, users}) => {
    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: '#E59866',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <div>
            <CssBaseline />
            <AppBar component="nav" sx={{ zIndex: 9999 }}>
                <Toolbar>
                    {users[authedUser.id].avatarURL?
                        <Avatar src={users[authedUser.id].avatarURL} />:
                        <Avatar {...stringAvatar(authedUser.name)} />
                    }

                    <Typography
                        spacing={50}
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, padding: 1 }}
                    >
                        {authedUser.id}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button>
                            <Link sx={{ color: '#fff' }} href="/" variant="body1">
                                Home
                            </Link>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                            <Link sx={{ color: '#fff' }} href="leaderboard" variant="body1">
                                Leaderboard
                            </Link>
                        </Button>
                        <Button>
                            <Link sx={{ color: '#fff' }} href="/" variant="body1">
                                New Poll
                            </Link>
                        </Button>
                        <Button>
                            <Link sx={{ color: '#fff' }} href="/" variant="body1">
                                Logout
                            </Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};
const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Nav);