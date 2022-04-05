import './style.css'
import React from 'react';
import { Grid } from '@material-ui/core';
import SignUpForm from '../../components/signupForm';

const SignUp = () => {
    return (
        <div className="body_login">
            <Grid
                container
                spacing={0}
            >
                <Grid item xs={1} sm={1} md={1} lg={4} xl={4} spacing={0} />
                <Grid
                    container
                    item xs={10} sm={10} md={10} lg={4} xl={4}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                >
                    <div className="area_form_login">
                        <SignUpForm />
                    </div>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={4} xl={4} spacing={0} />
            </Grid>
        </div>
    )
}

export default SignUp
