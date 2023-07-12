import React from 'react';
import {
    Avatar, CardHeader,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {connect} from "react-redux";

const LeaderBoard = ({ users }) => {
    const sortedUsers = Object.keys(users).sort((a, b) => {
        const userA = users[a];
        const userB = users[b];
        const userAScore = Object.keys(userA.answers).length + Object.keys(userA.questions).length;
        const userBScore = Object.keys(userB.answers).length + Object.keys(userB.questions).length;
        return userBScore - userAScore;
    });
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Index</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Poll</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map((user, index) => {
                            const { name, avatarURL, answers, questions, id } = users[user];
                            return (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <CardHeader
                                        avatar={
                                            avatarURL?
                                                    <Avatar src={avatarURL} />:
                                                    <Avatar {...stringAvatar(name)} />
                                        }
                                        title={user}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {Object.keys(answers).length}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {Object.keys(questions).length}
                                </TableCell>
                            </TableRow>
                            )})}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};
const mapStateToProps = ({ users }) => {
    return {
        users,
    };
};

export default connect(mapStateToProps)(LeaderBoard);