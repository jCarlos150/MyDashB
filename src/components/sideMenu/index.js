import "./styles.css";
import logo from "../../images/icons/menuLogoBranco.png"
import logoReduzida from "../../images/icons/logo_reduzida.png"
import iconOpenMenu from "../../images/icons/icon_open_menu.png"
import iconCloseMenu from "../../images/icons/icon_close_menu.png"
import iconBusWhite from "../../images/icons/icon_bus_white.png"
import iconBusBlue from "../../images/icons/icon_bus_blue.png"
import iconUserWhite from "../../images/icons/icon_user_white.png"
import iconUserBlue from "../../images/icons/icon_user_blue.png"
import iconSpeedWhite from "../../images/icons/icon_speed_white.png"
import iconSpeedBlue from "../../images/icons/icon_speed_blue.png"
import iconGetOnBusWhite from "../../images/icons/icon_get_on_bus_white.png"
import iconGetOnBusBlue from "../../images/icons/icon_get_on_bus_blue.png"
import iconJoinDataWhite from "../../images/icons/icon_join_data_white.png"
import iconJoinDataBlue from "../../images/icons/icon_join_data_blue.png"
import { useContext, useState } from "react";
import { Context } from "../../myhooks/context/authContext";

const SideMenu = (props) => {
    const [selected, setSelected] = useState(props.selected)
    const [hasExtended, setExtended] = useState(false)
    const { user } = useContext(Context);

    const getClassesIconBySelected = (option) => {
        return selected === option ? (
            "div_option_menu div_option_menu_selected" + (hasExtended ? " div_option_menu_selected_extended" : "")
        ) : (
            "div_option_menu" + (hasExtended ? " div_option_menu_extended" : "")
        )
    }

    const changeStateParent = (value) => {
        props.changeState(value)
        setSelected(value)
    }

    return (
        <div className={hasExtended ? "container_menu_extended" : "container_menu"}>
            <div className="menu_lateral">
                <div className="div_icons_menu">
                    <div className="div_content_menu">
                        <img className={hasExtended ? "logo" : "logo_reduzida"} src={hasExtended ? logo : logoReduzida} alt="logo reduzida" />
                        <div className={getClassesIconBySelected(1)} onClick={() => changeStateParent(1)}>
                            <img src={selected === 1 ? iconBusBlue : iconBusWhite} alt="abrir menu" />
                            {hasExtended && (
                                <p>Informações gerais sobre viagens</p>
                            )}
                        </div>
                        <div className={getClassesIconBySelected(2)} onClick={() => changeStateParent(2)}>
                            <img src={selected === 2 ? iconSpeedBlue : iconSpeedWhite} alt="abrir menu" />
                            {hasExtended && (
                                <p>Indicadores de Bilhetagem</p>
                            )}
                        </div>
                        <div className={getClassesIconBySelected(3)} onClick={() => changeStateParent(3)}>
                            <img src={selected === 3 ? iconGetOnBusBlue : iconGetOnBusWhite} alt="abrir menu" />
                            {hasExtended && (
                                <p>Análises de tendência</p>
                            )}
                        </div>
                        <div className={getClassesIconBySelected(4)} onClick={() => changeStateParent(4)}>
                            <img src={selected === 4 ? iconJoinDataBlue : iconJoinDataWhite} alt="abrir menu" />
                            {hasExtended && (
                                <p>Cruzamento de dados</p>
                            )}
                        </div>
                    </div>
                    <div className="div_second_content_menu">
                        <div className={getClassesIconBySelected(9)} onClick={() => changeStateParent(9)}>
                            <img className="div_profile_icon" src={selected === 9 ? iconUserBlue : iconUserWhite} alt="abrir menu" />
                            {hasExtended && (

                                <p>{user}</p>
                            )}
                        </div>
                    </div>
                    <div className="div_footer">
                        <div className={getClassesIconBySelected(10)} onClick={() => { 
                            setExtended(!hasExtended)
                        }}>
                            <img className="div_option_footer" src={hasExtended ? iconCloseMenu : iconOpenMenu} alt="abrir menu" />
                            {hasExtended && (
                                <p>Retrair Menu</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;