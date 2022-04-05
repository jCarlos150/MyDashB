import { useState, useContext } from "react";
import { Context } from "../../myhooks/context/authContext";
import "./styles.css";
import useFormik from "../../myhooks/formikit";
import { login_endpoint } from "../../routes-names";
import { Grid, TextField, Checkbox, Snackbar } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { signUp, login } from "../../services/AccessService";
import { Alert } from "@material-ui/lab";

const SignUpForm = () => {
  const history = useHistory();

  const { handleLogin, alterarEmail, alterarUsuario } = useContext(Context);
  const [checked, setChecked] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);


  const closeErrorAlert = () => {
    setOpenErrorAlert(false)
  }

  const formkik2 = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      frequencia: 0,
      checked: false
    }
  });

  function handlesubmit(event) {
    event.preventDefault();

    let values = {
      name: formkik2.values.nome,
      email: formkik2.values.email,
      password: formkik2.values.senha,
      frequencia: formkik2.values.frequencia,
      checked: checked
    }

    signUp(values)
      .then((response) => {
        console.log("Valores aqui")
        console.log(response);
        alterarEmail(values.email)
        alterarUsuario(values.name);
        localStorage.setItem("welcome_message", "1")
        let usuario = {
          email: values.email,
          password: values.password
        }
        login(usuario).then((response) => {
          // console.log(response.data);
          localStorage.setItem('token', response.data)
          handleLogin();
        })


      })
      .catch(() => {
        setOpenErrorAlert(true)
        alert(`Usuário já existe!\nVerifique os seus dados...`)
      })
  }

  return (
    <div className="form_login">
      <Snackbar open={openErrorAlert} autoHideDuration={5000} onClose={closeErrorAlert}>
        <Alert onClose={closeErrorAlert} severity="error">Usuário já existe! Verifique os seus dados...</Alert>
      </Snackbar>

      <Grid container>
        <Grid
          container
          item
          xs={3}
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <a href={"#option"} onClick={() => history.replace(login_endpoint)}>
            <div id={"button_back_login"}>
              <ArrowBack id={"link_btn_back_login"} color="primary" />
            </div>
          </a>
        </Grid>
        <Grid
          container
          item
          xs={6}
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <p className="title_signup">Cadastro</p>
        </Grid>
        <Grid container item xs={3} spacing={0} />
      </Grid>

      <form onSubmit={handlesubmit}>
        <TextField
          id="nome"
          type="text"
          name="nome"
          label="Nome"
          onBlur={formkik2.handleBlur}
          onChange={formkik2.handleChange}
          value={formkik2.values.nome}
          error={formkik2.touched.nome && formkik2.erros.nome}
          helperText={
            formkik2.touched.nome && formkik2.erros.nome
              ? formkik2.erros.nome
              : ""
          }
          required
        />
        <br />
        <TextField
          id="email"
          type="email"
          name="email"
          label="Email"
          onBlur={formkik2.handleBlur}
          onChange={formkik2.handleChange}
          value={formkik2.values.email}
          error={formkik2.touched.email && formkik2.erros.email}
          helperText={
            formkik2.touched.email && formkik2.erros.email
              ? formkik2.erros.email
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
          onBlur={formkik2.handleBlur}
          onChange={formkik2.handleChange}
          value={formkik2.values.senha}
          error={formkik2.touched.senha && formkik2.erros.senha}
          helperText={
            formkik2.touched.senha && formkik2.erros.senha
              ? formkik2.erros.senha
              : ""
          }
          required
        />
        <br />
        <TextField
          id="outlined-select-currency-native"
          select
          name="frequencia"
          label="Frequência de uso do STP"
          value={formkik2.values.frequencia}
          onChange={formkik2.handleChange}
          SelectProps={{
            native: true,
          }}
          helperText={
            formkik2.touched.frequencia && formkik2.erros.frequencia
              ? formkik2.erros.frequencia
              : ""
          }
          error={formkik2.touched.frequencia && formkik2.erros.frequencia}
          variant="outlined"
          required
        >
          <option aria-label="None" hidden value={""} />
          <option label={"Diariamente"} value={1} />
          <option label={"Toda semana"} value={2} />
          <option label={"Algumas vezes"} value={3} />
          <option label={"Quase nunca"} value={4} />
        </TextField>
        <br />
        <div id="div_concordo_termos">
          <Checkbox
            checked={checked}
            onChange={() => {
              setChecked(!checked);
            }}
            name="checked"
            color="primary"
          />
          <a href="#termos">Li e concordo com os termos de uso</a>
        </div>
        <input type="submit" value="Cadastrar" className="btn btn_cadastrar" />
      </form>
      <br />
      <a id="link_ir_p_login" href="#option" onClick={() => history.replace(login_endpoint)}>
        Já é cadastrado? Acesse o sistema
      </a>
    </div>
  );
};

export default SignUpForm;
