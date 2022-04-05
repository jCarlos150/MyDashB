import { useContext, useState } from "react";
import { Context } from "../../myhooks/context/authContext";

import "./styles.css";
//import UserIcon from "./user.png";
import LogoMenor from "../../images/icons/menuLogo.png";
import { Hidden } from "@material-ui/core";
//import { useHistory } from "react-router-dom";

const NavUser = () => {



  const { handleLogout } = useContext(Context);

  const [show, isShow] = useState(false);



  function hanndlerShow() {
    isShow(!show);
  }

  return (
    <div
      class="navUser_root"
      onMouseOver={() => hanndlerShow()}
      onMouseOut={() => hanndlerShow()}
    >
      <Hidden smUp>
        <img src={LogoMenor} alt={"logo"} id={"logo_menu_hide"} className="logoU" />
      </Hidden>
      <Hidden smDown>
        <p></p>
      </Hidden>
      <div className="navUser">
        <b><p>Olá, Usuário</p></b>
      </div>
      <div className="navUser" onClick={handleLogout}>
        <b><p>Sair</p></b>
      </div>
    </div>
  );
};

export default NavUser;
