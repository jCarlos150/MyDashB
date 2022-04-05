import "./style.css";
import React from "react";
import LoginForm from '../../components/loginForm';
import { Grid } from "@material-ui/core";

const Login = () => {
  return (
    <div className="body_login_">
      <Grid container spacing={0}>
        <Grid item sm={1} md={1} lg={4} xl={4} spacing={0} />
        <Grid
          container
          item
          sm={10} 
          md={10}
          lg={4}
          xl={4}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <div className="area_form_login">
            <LoginForm />
          </div>
        </Grid>
        <Grid item sm={1} md={1} lg={4} xl={4} spacing={0} />
      </Grid>
    </div>
  );
};

export default Login;
