import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import Button from '@mui/material/Button';
import {connect} from "react-redux";
import {
    Avatar, Box, Typography
    , CssBaseline
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Question from "./Question";

const Dashboard = ({authedUser, questions, users}) => {
    const navItems = ['Home', 'About', 'Contact'];
    const navigate = useNavigate();

    const handleOnClick = (question) => {
        navigate(`/${question.id}`);
    };

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));


    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#E59866',
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ zIndex: 9999 }}>
                <Toolbar>
                    <Avatar {...stringAvatar(authedUser.name)} />
                    <Typography
                        spacing={50}
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, padding: 1 }}
                    >
                        {authedUser.id}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8
                }}
            >
                <h1>Answered Questions</h1>
                {questions.filter(unanswered).map((question) => (
                    <Question question={question} user={users[question.author].name}/>
                ))}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 8
                }}
            >
                <h1>Unanswered Questions</h1>
                {questions.filter(answered).map((question) => (
                    <Question question={question} user={users[question.author].name}/>
                ))}
            </Box>
        </Box>
    );
};

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);