import Footer from "../../components/footer";
import { useState, useEffect, useContext } from "react"
import { Context } from "../../myhooks/context/authContext";
import giphy from "../../images/icons/giphy.gif";
// import iconGrowing from "../../images/icons/icon_growing.png";
// import iconDecrease from "../../images/icons/icon_decrease.png";
import Chart from "react-google-charts";
import Shimmer from "react-shimmer-effect";
import { orderByDaysInPortuguese, montarDataSemanal, mediaG } from ".";
import axios from "axios";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressão';
import { Button } from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const Grafico3 = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const [g9, setG9] = useState([])
    const [dadosPrevG9, setdadosPrevG9] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg9, setPDF9] = useState([])
    const [pdfg10, setPDF10] = useState([])
    const [g10, setG10] = useState([])
    const [dadosPrevG10, setdadosPrevG10] = useState({
        total: 40,
        media: 40,
    });
    const { codigoLine, linhaName } = useContext(Context);
    const getSizeGraph = "100%";
    const [dataPrev, setDataPrev] = useState()

    const visualizarImpressao = async (vetor, title, total, media) => {
        //console.log("aqui")
        //console.log(vetor)



        const classeImpressao = new Impressao(vetor, title, total, media);
        const documento = await classeImpressao.PreparaDocumento()
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }










    /* function validarCarregamento() {
         if (g4.length > 0 || g5.length > 0) {
             return true;
         }
         return false;
     }
     
     */

    function getDatePrev() {
        let date = new Date();

        date.setDate(date.getDate() + 7);

        let dateTempD = date.getDate()
        let dateTempM = date.getMonth() + 1;

        setDataPrev(dateTempD + "/" + dateTempM);

    }
    function validarCarregamento() {
        if (g9.length > 0 && g10.length) {
            return true;
        }
        return false;
    }



    const loading = () => {
        return (
            <div className="containerLoading">
                <Shimmer style={{ display: "none" }}  >

                    { /*
                          
                          <div className="circle" />

                    <div className="line" />

                      */    }
                    <img src={giphy} />

                </Shimmer>
            </div>
        )
    }



    const areaGrafico3 = () => {
        return (
            <div className="container_grafico">
                <div className="rowMain">
                    <div className="row4_graph_3">
                        <div className="div_data_dashboard card2_graph_2">
                            <p className="title_card_graph_2">Predição média de passageiros por viagem semana seguinte
                                ({" " + dataPrev})   <span className="parametro">parâmetro gratuidade</span>
                            </p>
                            <Chart
                                width={getSizeGraph}
                                height={getSizeGraph}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={g9}
                                options={{
                                    backgroundColor: "transparent",
                                    hAxis: {
                                        title: "",
                                    },
                                    vAxis: {
                                        title: "",
                                    },
                                    animation: {
                                        startup: true,
                                        easing: 'out',
                                        duration: 1500,

                                    },
                                }}
                                rootProps={{ "data-testid": "1" }}
                            />

                            <br />
                            <p className="legenda_card">
                                {/* <img className="icon_card_double" src={iconGrowing} alt="iconGrowing" /> */}
                                <span className="value_positive subleg">
                                    Total de acumulado <span className="dadosG">{parseFloat(dadosPrevG9.total).toFixed(2)}</span> </span>
                            </p>
                            <p className="legenda_card">
                                {/* <img className="icon_card_double" src={iconGrowing} alt="iconGrowing" /> */}
                                <span className="value_positive subleg">
                                    Média semanal diária <span className="dadosG">{parseFloat(dadosPrevG9.media).toFixed(2)}</span></span>
                            </p>
                            <div>

                            </div>
                            <br />
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressao(pdfg9, `Predição média de passageiros por viagem semana seguinte(${dataPrev}) Parãmetro gratuidade linha: (${linhaName})`, dadosPrevG9.total, dadosPrevG9.media)
                                }}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar dados
                            </Button>
                        </div>
                        <div className="div_data_dashboard card2_graph_2">
                            <p className="title_card_graph_2">Predição média de passageiros por viagem semana seguinte
                                ({" " + dataPrev})   <span className="parametro">parâmetro inteira</span>
                            </p>
                            <Chart
                                width={getSizeGraph}
                                height={getSizeGraph}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={g10}
                                options={{
                                    backgroundColor: "transparent",
                                    hAxis: {
                                        title: "",
                                    },
                                    vAxis: {
                                        title: "",
                                    },
                                    animation: {
                                        startup: true,
                                        easing: 'out',
                                        duration: 1500,

                                    },
                                }}
                                rootProps={{ "data-testid": "1" }}
                            />

                            <br />
                            <p className="legenda_card">
                                {/* <img className="icon_card_double" src={iconGrowing} alt="iconGrowing" /> */}
                                <span className="value_positive subleg">

                                    Total de acumulado <span className="dadosG">{parseFloat(dadosPrevG10.total).toFixed(2)}</span> </span>


                            </p>
                            <p className="legenda_card">
                                {/* <img className="icon_card_double" src={iconGrowing} alt="iconGrowing" /> */}
                                <span className="value_positive subleg">

                                    Média semanal diária <span className="dadosG">{parseFloat(dadosPrevG10.media).toFixed(2)}</span></span>


                            </p>
                            <div>

                            </div>
                            <br />
                            <p className="legenda_card">
                                {/* <img className="icon_card_double" src={iconGrowing} alt="iconGrowing" /> */}
                                <span className="value_positive">

                                </span>
                            </p>
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressao(pdfg10, `Predição média de passageiros por viagem semana seguinte (${dataPrev}) parâmetro inteira linha: (${linhaName})`, dadosPrevG10.total, dadosPrevG10.media)
                                }}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar dados
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    useEffect(() => {

        getDatePrev()





        let firstPosition = ["Dia", "Total"]
        let g9Temp = [firstPosition]
        let g10Temp = [firstPosition]
        let token = localStorage.getItem('token')
        console.log("aqui o token")
        console.log(token)

        //let g10Temp = [firstPosition]

        axios.get("https://dashbus-api.herokuapp.com/predict/trips/week/gratuity/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalG9Temp = 0;
            let mediaG9 = 0;
            setPDF9(montarDataSemanal(response.data, "dayWeek", "count"));
            // console.log("aqui");
            //  console.log(pdfg9)
            for (let i in response.data) {
                g9Temp.push([response.data[i].dayWeek, response.data[i].count])
                totalG9Temp = totalG9Temp + response.data[i].count;
            }
            mediaG9 = mediaG(totalG9Temp, 7)
            let dadosG9 = {
                total: totalG9Temp,
                media: mediaG9,
            }
            setdadosPrevG9(dadosG9);

            setG9(orderByDaysInPortuguese(g9Temp, firstPosition));



        })

        axios.get("https://dashbus-api.herokuapp.com/predict/trips/week/entire/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalG10Temp = 0;
            let mediaG10 = 0;
            setPDF10(montarDataSemanal(response.data, "dayWeek", "count"))
            for (let i in response.data) {
                g10Temp.push([response.data[i].dayWeek, response.data[i].count])
                totalG10Temp = totalG10Temp + response.data[i].count;
            }
            mediaG10 = mediaG(totalG10Temp, 7)
            let dadosG10 = {
                total: totalG10Temp,
                media: mediaG10,

            }
            setdadosPrevG10(dadosG10);

            setG10(orderByDaysInPortuguese(g10Temp, firstPosition));

        })



    }, [codigoLine, linhaName])


    return !validarCarregamento() ? loading() : areaGrafico3();
}


export default Grafico3;