import "./style.css";
import { Grid, Hidden, Button, ButtonGroup } from "@material-ui/core";
import dispositivos from "../../images/dispositivos.png";
import logo from "../../images/icons/menuLogoBranco.png";
import cloth from "../../images/icons/cloth.png";
import speaking from "../../images/icons/speaking.png";
import glass from "../../images/icons/glass.png";
import logo_rodape from "../../images/logo_rodape.png"
import { Link } from "react-router-dom";
import { login_endpoint } from "../../routes-names";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory()
  
  return (
    <div className="body_landing">
      <div id={"menu"}>
        <img src={logo} alt={""} />
        <Hidden smDown>
          <ButtonGroup variant={"text"} aria-label="text button group">
            <Button>Início</Button>
            <Button>Informações</Button>
            <Button>Quem Somos</Button>
            <Link to={login_endpoint}>
              <Button>Acessar o Sistema</Button>
            </Link>
          </ButtonGroup>
        </Hidden>
      </div>
      <div id={"div_inicial"}>
        <Grid container spacing={0}>
          <Grid item lg={6} xl={6} spacing={0}>
            <div id={"div_segunda"}>
              <p id={"title_page"}>
                Tudo sobre o Transporte Público de Teresina de forma simples e
                rápida!
              </p>
              <p id={"subtitle_page"}>
                Tenha acesso a estatísiticas e dados que vão te ajudar a
                compreender e a melhorar o transporte de nossa cidade!
              </p>
              <Button onClick={() => history.replace(login_endpoint)}>Acessar o sistema</Button>
            </div>
          </Grid>
          <Grid item lg={6} xl={6} spacing={0} />
        </Grid>
      </div>
      <div id={"div_info_1"}>
        <p className={"title_div_info"}>O STP em suas mãos</p>
        <p className={"subtitle_div_info"}>
          Tenha acesso aos principais dados do Sistema de Transporte Público de
          Teresina.
        </p>
        <div id={"div_info"}>
          <div id={"div_info_1_content"}>
            <div>
              <img src={cloth} alt="icon" />
            </div>
            <p>Dados limpos e claros</p>
          </div>
          <div id={"div_info_1_content"}>
            <div>
              <img src={glass} alt="icon" />
            </div>
            <p>Mais transparência para você</p>
          </div>
          <div id={"div_info_1_content"}>
            <div>
              <img src={speaking} alt="icon" />
            </div>
            <p>Dê sua opinião sobre o STP</p>
          </div>
        </div>
      </div>
      <div id={"div_info_2"}>
        <p className={"title_div_info"}>Em qualquer lugar</p>
        <p className={"subtitle_div_info"}>
          Estamos presentes em todas as plataformas...
        </p>
        <img id={"image_dispositivos"} src={dispositivos} alt={""} />
      </div>
      <div id={"footer"}>
        <Hidden smDown>
          <Grid container spacing={0}>
            <Grid
              item
              lg={4}
              xl={4}
              spacing={0}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <img src={logo_rodape} alt={""} />
            </Grid>
            <Grid
              item
              lg={4}
              xl={4}
              spacing={0}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <p>© Jaegers Tech, 2021 - Todos os direitos reservados.</p>
            </Grid>
            <Grid item lg={4} xl={4} spacing={0} />
          </Grid>
        </Hidden>
        <Hidden smUp>
          <div id={"rodape_small"}>
            <img src={logo_rodape} alt={""} />
            <p>© Jaegers Tech, 2021 - Todos os direitos reservados.</p>
          </div>
        </Hidden>
      </div>
    </div>
  );
};

export default LandingPage;


/**
 *
 *
 *
      <div id={"div_info_1"}>
        <p className={"title_div_info"}>O STP em suas mãos</p>
        <p className={"subtitle_div_info"}>
          Tenha acesso aos principais dados do Sistema de Transporte Público de
          Teresina.
        </p>
        <div id={"div_info"}>
          <div id={"div_info_1_content"}>
            <div>
              <img src={cloth} alt="icon" />
            </div>
            <p>Dados limpos e claros</p>
          </div>
          <div id={"div_info_1_content"}>
            <div>
              <img src={glass} alt="icon" />
            </div>
            <p>Mais transparência para você</p>
          </div>
          <div id={"div_info_1_content"}>
            <div>
              <img src={speaking} alt="icon" />
            </div>
            <p>Dê sua opinião sobre o STP</p>
          </div>
        </div>
      </div>
      <div id={"div_info_2"}>
        <p className={"title_div_info"}>Em qualquer lugar</p>
        <p className={"subtitle_div_info"}>
          Estamos presentes em todas as plataformas...
        </p>
        <img id={"image_dispositivos"} src={dispositivos} alt={""} />
      </div>

 *
 *
 *       <div id={"footer"}>
        <Hidden smDown>
          <Grid container spacing={0}>
            <Grid
              item
              lg={4}
              xl={4}
              spacing={0}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <img src={logo_rodape} alt={""} />
            </Grid>
            <Grid
              item
              lg={4}
              xl={4}
              spacing={0}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <p>© Jaegers Tech, 2021 - Todos os direitos reservados.</p>
            </Grid>
            <Grid item lg={4} xl={4} spacing={0} />
          </Grid>
        </Hidden>
        <Hidden smUp>
          <div id={"rodape_small"}>
            <img src={logo_rodape} alt={""} />
            <p>© Jaegers Tech, 2021 - Todos os direitos reservados.</p>
          </div>
        </Hidden>
      </div>

 *
 *
 */