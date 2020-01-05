import React from 'react';

/* Import Components  */
import {
    Button,
    Card,
    CardActions,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RibClient from 'rib-client'

import PasswordField from "../components/inputFields/PasswordField";

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 64
    },
    title: {
        paddingTop: 15
    },
    form: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: "right",
    },
    bottomActions: {
        borderTop: "1px solid rgba(160,160,160,0.2)",
        justifyContent: "center",
        padding: 15,
    }
}));

export default function LogIn() {
    let myRib = new RibClient<{login: ({username, password}: {username: string, password: string}) => void}>();
    const classes = useStyles();
    let [username, setUsername] = React.useState();
    let [password, setPassword] = React.useState();

    let handleUpdateUsername = (event: any) => {
        setUsername(event.target.value);
    }

    let handleUpdatePassword = (event: any) => {
        setPassword(event.target.value);
    }

    let handleReset = (event: any) => {
        setUsername("");
        setPassword("");
    }

    let handleSubmit = async (event: any) => {
        event.preventDefault();
        myRib.serverFunctions.login({ username: username, password: password })
        console.log(`Submit username: ${username} & password: ${password} to server`);
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item md={4}>
                    <Card>
                        <Typography className={classes.title} component="h1" variant="h5" align="center">
                            Sign In
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={handleUpdateUsername}
                            />
                            <PasswordField
                                onChange={handleUpdatePassword}
                            />
                            <Button onClick={handleReset} type="reset">Clear</Button>
                            <CardActions className={classes.bottomActions}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >Submit</Button>
                            </CardActions>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
