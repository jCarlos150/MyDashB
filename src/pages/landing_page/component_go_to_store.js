import "./style.css";
import React from "react";
import get_it_on_play from "../../images/get_it_on_play_store.png";
import available_on_the_app from "../../images/available_on_the_app_store.png";

const ComponentGoToStore = (props) => {
  let isFull = props.full === undefined ? false : props.full;

  return (
    <div id={isFull ? "div_full_go_to_store" : ""}>
      <div id={"div_mobile_subtitle"}>
        <p id={"subtitle_page_download_app"}>
          Quer Acessar pelo celular? Baixe o aplicativo ;D
        </p>
        <a
          href={"https://play.google.com/store?hl=pt_BR&gl=US"}
          target={"_blank"}
          rel="noreferrer"
        >
          <img src={get_it_on_play} alt={"alt uuu hi hi birijim"} />
        </a>
        <a
          href={"https://apps.apple.com/br/app/apple-store/id375380948"}
          target={"_blank"}
          rel="noreferrer"
        >
          <img src={available_on_the_app} alt={"alt uuu hi hi birijim"} />
        </a>
      </div>
    </div>
  );
};

export default ComponentGoToStore;
