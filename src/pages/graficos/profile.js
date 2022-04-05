import Footer from "../../components/footer";
//import IconUserBlue from "../../images/icons/icon_user_blue.png"
import { useContext } from "react";
import { Context } from "../../myhooks/context/authContext";
import { Hidden } from "@material-ui/core";

const Profile = () => {
    const { handleLogout, emailUser, imgUser, user } = useContext(Context);

    return (
        <div className="container_grafico">
            <div className="container_content_profile">
                <img className="icon_edit_profile" src={imgUser} alt="icon" />
                <div className="content_text_profile">
                    <p className="title_field_profile">Nome</p>
                    <p className="data_field_profile">{user}</p>
                    <p className="title_field_profile">Email</p>
                    <p className="data_field_profile">{emailUser}</p>
                    {/* <p className="title_field_profile">Senha</p>
                    <p className="data_field_profile">********</p> */}
                </div>
                {/* <button className="button_edit_profile" onClick={() => alert('Em breve')}>EDITAR PERFIL</button> */}
                <Hidden smUp>
                    <button className="button_edit_profile btn_logout" onClick={handleLogout}>SAIR</button>
                </Hidden>
            </div>
            <div className="container_logout_profile">
                <Hidden smDown>
                    <button className="button_edit_profile btn_logout" onClick={handleLogout}>SAIR</button>
                </Hidden>
            </div>
            <Footer />
        </div>
    )
}

export default Profile;