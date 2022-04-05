import { useState, useContext } from "react";
import { Context } from "../../myhooks/context/authContext";
import "./styles.css";
import logo from "../../images/icons/menuLogo.png";
import facebook from "../../images/icons/fb.png";
import google from "../../images/icons/google.png";
import useFormik from "../../myhooks/formikit";
import { signup_endpoint, facebookndpoint, googleendpoint } from "../../routes-names";
import { TextField, Snackbar, Slide, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { login } from "../../services/AccessService";
import axios from "axios";
import jwt from 'jwt-decode';

const LoginForm = () => {
  const history = useHistory()
  const { handleLogin, alterarUsuario, alterarImg, handleLoginSocial, alterarEmail } = useContext(Context);
  const [erroDeLogin, setErrorDeLogin] = useState("");
  const [openSnackError, setOpenSnackError] = useState(false);
  const [erroSocial, setErroSocial] = useState(false);


  const formkik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    let values = {
      email: formkik.values.email,
      password: formkik.values.senha
    }
    login(values)
      .then((res) => {
        const token = res.data;
        //console.log(token);
        const user = jwt(token);
        //console.log(user)
        alterarUsuario(user.name);
        alterarEmail(user.email);
        localStorage.setItem('token', token)
        handleLogin()
      })
      .catch((error) => {
        console.log(error)
        setErrorDeLogin("Usuário ou senha incorreto(s)");
        setOpenSnackError(true);
      })
  }

  const responseGoogle = (response) => {
    //alert(JSON.stringify(response))
    try {
      const {
        profileObj: { name, email, imageUrl, },
        tokenObj: { access_token }
      } = response;
      if (name) {
        //console.log(response);
        axios.post(googleendpoint, {
          email: email,
          name: name
        },
          {
            headers: {
              Authorization: 'Bearer ' + access_token
            }
          }

        ).then(res => {
          //console.log(res.status)
          if (res.status === 200) {
            alterarUsuario(name);
            alterarImg(imageUrl);
            alterarEmail(email);
            localStorage.setItem('token', res.data)
            handleLoginSocial();
          } else {
            setErroSocial(true);
          }
        })
      } else {
        setErroSocial(true);
      }
    } catch (error) {
      console.log(error)
      setErroSocial(true);
    }
  }

  const responseFacebook = (response) => {
    if (response.status === "unknown") {
      setErroSocial(true);
    } else {
      console.log(response);
      axios.post(facebookndpoint, {
        email: response.name + "@usuarioFacebook.com",
        name: response.name
      },
        {
          headers: {
            Authorization: 'Bearer ' + response.accessToken
          }
        }
      ).then(res => {
        //console.log(res.status)
        if (res.status === 200) {
          alterarUsuario(response.name);
          let userEmail = response.name + "@usuarioFacebook.com";
          alterarEmail(userEmail)
          alterarUsuario(response.name)
          localStorage.setItem('token', res.data)
          handleLoginSocial();
        } else {
          setErroSocial(true);
        }
      })
    }
  }

  return (
    <div className="form_login">
      <Snackbar
        severity="error"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackError}
        TransitionComponent={Slide}
        transitionDuration={200}
        onClose={() => setOpenSnackError(false)}
      >
        <Alert severity="error" elevation={6} variant="filled">
          {erroDeLogin}
        </Alert>
      </Snackbar>

      <img src={logo} alt={logo} />
      <form onSubmit={(event) => handleSubmit(event)}>
        <TextField
          id="email"
          type="email"
          name="email"
          label="Email"
          onBlur={formkik.handleBlur}
          onChange={formkik.handleChange}
          value={formkik.values.email}
          error={formkik.touched.email && formkik.erros.email}
          helperText={
            formkik.touched.email && formkik.erros.email
              ? formkik.erros.email
              : ""
          }
          required
        />
        <br />
        <TextField
          id="senha"
          type="password"
          name="senha"
          label="Senha"
          onBlur={formkik.handleBlur}
          onChange={formkik.handleChange}
          value={formkik.values.senha}
          error={formkik.touched.senha && formkik.erros.senha}
          helperText={
            formkik.touched.senha && formkik.erros.senha
              ? formkik.erros.senha
              : ""
          }
          required
        />

        <a id={"link_esqueci_senha"} href="#option">
          Esqueci minha senha
        </a>
        <input type="submit" value="Entrar" className="btn_login"></input>
        <input onClick={() => history.replace(signup_endpoint)} value="Cadastre-se" className="btn_login btn_sign" />
      </form>
      <br />
      <Grid
        container
        spacing={0}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item lg={5} xl={5} spacing={0} className="divisor" />
        <Grid item lg={2} xl={2} spacing={0}>
          <p id={"text_ou"}>OU</p>
        </Grid>
        <Grid item lg={5} xl={5} spacing={0} className="divisor" />
      </Grid>


      <FacebookLogin
        appId="585401742656342"
        callback={responseFacebook}
        isMobile={false}
        render={renderProps => (

          <button className="btn_login btnface"
            onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <img src={facebook} alt="logo facebook" />
            <span>CONTINUE COM O FACEBOOK</span>
          </button>
        )}
      />


      <GoogleLogin
        clientId="473283810785-lvnu7l8o353ku1vorvpghil83271gri5.apps.googleusercontent.com"
        render={renderProps => (

          <button className="btn_login btnface btngoogle"
            onClick={renderProps.onClick} disabled={renderProps.disabled}
          >
            <img src={google} alt="logo google" />
            <span>CONTINUE COM O GOOGLE</span>
          </button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
      <p className={erroSocial ? "erro-true" : "erro-false"}>
        Erro no login social
      </p>

      { /*
      <a href="https://dashbus-api.herokuapp.com/auth/facebook" style={{
        width: "58VH"
      }}>
        <button className="btn btnface" >

          <img src={facebook} alt="logo facebook" />
          <span>CONTINUE COM O FACEBOOK</span>
        </button>
      </a>
      <a href="https://dashbus-api.herokuapp.com/auth/google" style={{
        width: "58VH"
      }}>
        <button className="btn btnface btngoogle"

        >
          <img src={google} alt="logo google" />
          <span>CONTINUE COM O GOOGLE</span>
        </button>
      </a>
           */
      }

    </div>
  );
};

export default LoginForm;
