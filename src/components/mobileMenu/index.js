import "./styles.css";
import iconBusWhite from "../../images/icons/icon_bus_white.png"
import iconBusBlue from "../../images/icons/icon_bus_blue.png"
import iconUserWhite from "../../images/icons/icon_user_white.png"
import iconUserBlue from "../../images/icons/icon_user_blue.png"
import iconSpeedWhite from "../../images/icons/icon_speed_white.png"
import iconSpeedBlue from "../../images/icons/icon_speed_blue.png"
import iconGetOnBusWhite from "../../images/icons/icon_get_on_bus_white.png"
import iconGetOnBusBlue from "../../images/icons/icon_get_on_bus_blue.png"
import { useState } from "react";

const MobileMenu = (props) => {
    const [selected, setSelected] = useState(props.selected)

    const getClassesIconBySelected = (option) => {
        return selected === option ? (
            "div_option_menu_mobile div_option_menu_mobile_selected"
        ) : (
            "div_option_menu_mobile"
        )
    }

    const changeStateParent = (value) => {
        props.changeState(value)
        setSelected(value)
    }

    return (
        <div className="container_mobile_menu">
            <div className={getClassesIconBySelected(1)} onClick={() => changeStateParent(1)}>
                <img src={selected === 1 ? iconBusBlue : iconBusWhite} alt={"icon"} />
            </div>
            <div className={getClassesIconBySelected(2)} onClick={() => changeStateParent(2)}>
                <img src={selected === 2 ? iconSpeedBlue : iconSpeedWhite} alt={"icon"} />
            </div>
            <div className={getClassesIconBySelected(3)} onClick={() => changeStateParent(3)}>
                <img src={selected === 3 ? iconGetOnBusBlue : iconGetOnBusWhite} alt={"icon"} />
            </div>
            <div className={getClassesIconBySelected(4)} onClick={() => changeStateParent(4)}>
                <img src={selected === 4 ? iconUserBlue : iconUserWhite} alt={"icon"} />
            </div>
        </div>
    )
}

export default MobileMenu;