import "./styles.css";

import Navbar from "../../components/navbar";
import SideMenu from "../../components/sideMenu";
import MobileMenu from "../../components/mobileMenu";
import { useState } from "react";
import Grafico1 from "./grafico1";
import Grafico2 from "./grafico2";
import Grafico3 from "./grafico3";
import Grafico4 from "./grafico4";
import Profile from "./profile";
import { Hidden, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";

export const orderByDaysInPortuguese = (listOrigin, firstPosition) => {
  let returnList = []
  returnList.push(firstPosition, [], [], [], [], [], [], [])

  listOrigin.map((it) => {
    switch (it[0]) {
      case "Monday":
        returnList[1] = ["Segunda-Feira", it[1]]
        break;
      case "Thursday":
        returnList[2] = ["Terça-Feira", it[1]]
        break;
      case "Wednesday":
        returnList[3] = ["Quarta-Feira", it[1]]
        break;
      case "Tuesday":
        returnList[4] = ["Quinta-Feira", it[1]]
        break;
      case "Friday":
        returnList[5] = ["Sexta-Feira", it[1]]
        break;
      case "Saturday":
        returnList[6] = ["Sábado", it[1]]
        break;
      default:
        returnList[7] = ["Domingo", it[1]]
        break;
    }
  })

  return returnList
}

export const createDateFromData = (dataForDate) => {
  let date = new Date()
  date.setFullYear(
    parseInt(dataForDate[0]),
    parseInt(dataForDate[1]) - 1,
    parseInt(dataForDate[2]),
  )
  return date
}

export const getDateList = (dateStart, dateEnd) => {
  let dates = []
  const newDate = new Date(dateStart)

  while (newDate < dateEnd) {
    dates = [...dates, new Date(newDate)]
    newDate.setDate(newDate.getDate() + 1)
  }

  dates = [...dates, dateEnd]
  return dates
}

export const maskDate = (date) => {
  let retorno = ""
  retorno += (date.getDate() < 10 ? "0".concat(date.getDate()) : date.getDate())
  retorno += ("-")
  retorno += (date.getMonth() + 1 < 10 ? "0".concat(date.getMonth() + 1) : date.getMonth() + 1)
  retorno += ("-")
  retorno += (date.getFullYear())
  return retorno
}

export const maskDateForAPI = (date) => {
  console.log(date)
  let retorno = ""
  retorno += (date.getFullYear())
  retorno += ("-")
  retorno += (date.getMonth() + 1 < 10 ? "0".concat(date.getMonth() + 1) : date.getMonth() + 1)
  retorno += ("-")
  retorno += (date.getDate() < 10 ? "0".concat(date.getDate()) : date.getDate())
  return retorno
}

export const getDataForGraph = async (type, date, codigo) => {

  let maskedDate = maskDateForAPI(date)
  let token = localStorage.getItem('token')
  if (type == 0) {
    let retorno = await axios.get(`https://dashbus-api.herokuapp.com/ticketing/trips/types/${maskedDate}/${maskedDate}/${codigo}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
    )
    return retorno.data[0].passengers
  } else if (type == 1) {
    let retorno = await axios.get(`https://dashbus-api.herokuapp.com/ticketing/trips/types/${maskedDate}/${maskedDate}/${codigo}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return retorno.data[0].student
  } else if (type == 2) {
    let retorno = await axios.get(`https://dashbus-api.herokuapp.com/ticketing/trips/types/${maskedDate}/${maskedDate}/${codigo}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return retorno.data[0].gratuity
  } else if (type == 3) {
    let retorno = await axios.get(`https://dashbus-api.herokuapp.com/ticketing/trips/types/${maskedDate}/${maskedDate}/${codigo}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return retorno.data[0].entire
  } else {
    let retorno = await axios.get(`https://dashbus-api.herokuapp.com/ticketing/trips/count/${maskedDate}/${maskedDate}/${codigo}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    return retorno.data
  }
}
export const montarDataSemanal = (dadosGrafico, chaveDia, chaveQuantidade) => {
  let data = [

  ]


  for (let it in dadosGrafico) {
    let change = dadosGrafico[it][chaveDia];


    switch (change) {
      case "Monday":
        data[1] = {
          "Dia": "Segunda",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }
        break
      case "Thursday":
        data[2] = {
          "Dia": "Terça",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }
        break
      case "Wednesday":
        data[3] = {
          "Dia": "Quarta",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }

        break;
      case "Tuesday":
        data[4] = {
          "Dia": "Quinta",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }
        break;
      case "Friday":
        data[5] = {
          "Dia": "Sexta",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }
        break;
      case "Saturday":
        data[6] = {
          "Dia": "Sabado",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }
        break;
      default:
        data[0] = {
          "Dia": "Domingo",
          "Quantidade": dadosGrafico[it][chaveQuantidade]
        }
        break;
    }
  }

  return data;


}


export const mediaG = (valores, total) => {
  return valores / total;
}

const getTitle = (selected) => {
  switch (selected) {
    case 2:
      return "Indicadores de Bilhetagem"
    case 3:
      return "Análises de tendência";
    case 4:
      return "Cruzamento de dados";
    case 9:
      return "Perfil";
    default:
      return "Informações gerais sobre viagens";
  }
}

const Graficos = () => {
  const [selected, setSelected] = useState(1)
  const [title, setTitle] = useState(getTitle(1))

  const hwm = localStorage.getItem("welcome_message")
  const [isWelcome, setIsWelcome] = useState(hwm !== undefined && hwm == "1")

  const closeIsWelcome = () => {
    setIsWelcome(false)
    localStorage.setItem("welcome_message", "0")
  }

  return (
    <div className="container_graficos_body">
      <Snackbar open={isWelcome} autoHideDuration={5000} onClose={closeIsWelcome}>
        <Alert onClose={closeIsWelcome} severity="success">Usuário cadastrado com sucesso!</Alert>
      </Snackbar>

      <Hidden smDown>
        <SideMenu selected={selected} changeState={(value) => {
          setSelected(value)
          setTitle(getTitle(value))
        }} />
      </Hidden>
      <div className="container_content_">
        <Navbar title={title} />
        {selected === 1 && <Grafico1 />}
        {selected === 2 && <Grafico2 />}
        {selected === 3 && <Grafico3 />}
        {selected === 4 && <Grafico4 />}
        {selected === 9 && <Profile />}
        <Hidden smUp>
          <MobileMenu selected={selected} changeState={(value) => {
            setSelected(value)
            setTitle(getTitle(value))
          }} />
        </Hidden>
      </div>
    </div>
  );
};

export default Graficos;