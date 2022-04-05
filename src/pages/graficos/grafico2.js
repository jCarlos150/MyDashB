import Footer from "../../components/footer";
// import iconGrowing from "../../images/icons/icon_growing.png";
// import iconDecrease from "../../images/icons/icon_decrease.png";
import giphy from "../../images/icons/giphy.gif";
import Chart from "react-google-charts";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Context } from "../../myhooks/context/authContext";
import Shimmer from "react-shimmer-effect";
import { orderByDaysInPortuguese, montarDataSemanal, mediaG } from ".";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Impressao } from './impressão';
import { ImpressaoComparacao } from "./impressaoComparacao";
import { Button } from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const Grafico2 = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const [g4, setG4] = useState([])
    const [dadosPrevG4, setdadosPrevG4] = useState({
        "Total-Gratuidade": 0,
        "Média-Gratuidade": 0,
        "Total2-Passagens": 0,
        "Média2-Passagens": 0
    });
    //  const [pdfg4, setPDF4] = useState([])

    const [g5, setG5] = useState([])
    const [dadosPrevG5, setdadosPrevG5] = useState({
        "Total-Estudantes": 0,
        "Média-Estudantes": 0,
        "Total2-Passagens": 0,
        "Média2-Passagens": 0
    });
    const [g6, setG6] = useState([])
    const [dadosPrevG6, setdadosPrevG6] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg6, setPDF6] = useState([])

    const [g7, setG7] = useState([])
    const [dadosPrevG7, setdadosPrevG7] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg7, setPDF7] = useState([])
    const [g8, setG8] = useState([])
    const [dadosPrevG8, setdadosPrevG8] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg8, setPDF8] = useState([])
    const { dateGlobal, codigoLine, linhaName } = useContext(Context);

    //const [perG3, setperG3] = useState(); // % percentual de 
    function validarCarregamento() {
        if (g4.length > 0 && g5.length && g6.length > 0
            && g7.length > 0 && g8.length > 0

        ) {
            return true;
        }
        return false;
    }
    const visualizarImpressaoComparacaao = async (vetor, title) => {
        const classeImpressao = new ImpressaoComparacao(vetor, title);
        const documento = await classeImpressao.PreparaDocumento()
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    const visualizarImpressao = async (vetor, title, total, media) => {
        //console.log("aqui")
        //console.log(vetor)
        const classeImpressao = new Impressao(vetor, title, total, media);
        const documento = await classeImpressao.PreparaDocumento()
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }

    useEffect(() => {
        let firstPosition = ["Dia", "Total"]
        let g4temp = [["Gratuidade", "Passagens"]];
        let g5temp = [["Estudantes", "Passagens"]];
        let g6Temp = [firstPosition]
        let g7Temp = [firstPosition]
        let g8Temp = [firstPosition]
        let token = localStorage.getItem('token')
        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/relationship/gratuity/passengers/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(
                (response) => {
                    let total1 = 0;
                    let total2 = 0;
                    //  let media1 = 0;
                    // let media2 = 0

                    //  console.log(response.data);
                    for (let i in response.data) {
                        g4temp.push([response.data[i].x, response.data[i].y])
                        total1 += response.data[i].x
                        total2 += response.data[i].y
                    }

                    let pdfTemp = {
                        "Total Gratuidade": total1,
                        "Média Gratuidade": mediaG(total1, response.data.length),
                        "Total Passagens": total2,
                        "Média Passagens": mediaG(total2, response.data.length),
                    }
                    //  console.log(dadosPrevG4);
                    // console.log("aqui teste g4")
                    //console.log(pdfTemp);

                    setdadosPrevG4(pdfTemp);

                    setG4(g4temp);
                }
            )
        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/relationship/student/passengers/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(
                (response) => {
                    //  console.log(response.data);
                    let total1 = 0;
                    let total2 = 0;
                    for (let i in response.data) {
                        g5temp.push([response.data[i].x, response.data[i].y])
                        total1 += response.data[i].x
                        total2 += response.data[i].y
                    }
                    let pdfTemp = {
                        "Total Gratuidade": total1,
                        "Média Gratuidade": mediaG(total1, response.data.length),
                        "Total Passagens": total2,
                        "Média Passagens": mediaG(total2, response.data.length),
                    }
                    setdadosPrevG5(pdfTemp);

                    setG5(g5temp);
                }
            )
        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/type/week/gratuity/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalG6Temp = 0;
            let mediaG6 = 0;
            setPDF6(montarDataSemanal(response.data, "dayWeek", "count"));

            for (let i in response.data) {
                g6Temp.push([response.data[i].dayWeek, response.data[i].count])
                totalG6Temp = totalG6Temp + response.data[i].count;
            }
            mediaG6 = mediaG(totalG6Temp, 7)

            let dadosPrevG6 = {
                total: totalG6Temp,
                media: mediaG6,
            }
            setdadosPrevG6(dadosPrevG6);

            setG6(orderByDaysInPortuguese(g6Temp, firstPosition));
        })
        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/type/week/student/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalG7Temp = 0;
            let mediaG7 = 0;
            setPDF7(montarDataSemanal(response.data, "dayWeek", "count"));
            for (let i in response.data) {
                g7Temp.push([response.data[i].dayWeek, response.data[i].count])
                totalG7Temp = totalG7Temp + response.data[i].count;
            }
            mediaG7 = mediaG(totalG7Temp, 7)

            let dadosPrevG7 = {
                total: totalG7Temp,
                media: mediaG7,
            }
            setdadosPrevG7(dadosPrevG7);
            setG7(orderByDaysInPortuguese(g7Temp, firstPosition));
        })
        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/type/week/entire/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalG8Temp = 0;
            let mediaG8 = 0;
            setPDF8(montarDataSemanal(response.data, "dayWeek", "count"));

            for (let i in response.data) {
                g8Temp.push([response.data[i].dayWeek, response.data[i].count])
                totalG8Temp = totalG8Temp + response.data[i].count;
            }
            let dadosPrevG8 = {
                total: totalG8Temp,
                media: mediaG8,
            }
            setdadosPrevG8(dadosPrevG8);
            setG8(orderByDaysInPortuguese(g8Temp, firstPosition));
        })
    }, [
        dateGlobal, codigoLine
    ])

    const getSizeGraph = "90%"
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

    const areaGrafico2 = () => {
        return (
            <div className="container_grafico">
                <div className="row1Graph2">
                    <div className="row3_graph_2">
                        <div className="div_data_dashboard">
                            <p className="title_card">Gratuidade por dias da semana</p>
                            <Chart
                                width={"100%"}
                                height={"100%"}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={g6}
                                options={{
                                    backgroundColor: "transparent",
                                    hAxis: {
                                        title: "",
                                    },
                                    vAxis: {
                                        title: "",
                                    },
                                }}
                                rootProps={{ "data-testid": "1" }}
                            />
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressao(pdfg6, `Gratuidade por dias da semana período ${dateGlobal}  linha (${linhaName})  `, dadosPrevG6.total, dadosPrevG6.media)
                                }}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar dados
                            </Button>
                        </div>
                        <div className="div_data_dashboard card3_graph_2">
                            <p className="title_card">Estudantes por dias da semana</p>
                            <Chart
                                width={"100%"}
                                height={"100%"}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={g7}
                                options={{
                                    backgroundColor: "transparent",
                                    hAxis: {
                                        title: "",
                                    },
                                    vAxis: {
                                        title: "",
                                    },
                                }}
                                rootProps={{ "data-testid": "1" }}
                            />
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressao(
                                        pdfg7,
                                        `Estudantes por dias da semana período ${dateGlobal}  linha (${linhaName})  `, dadosPrevG7.total, dadosPrevG7.media
                                    )
                                }}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar dados
                            </Button>
                        </div>
                        <div className="div_data_dashboard card3_">
                            <p className="title_card">Inteiras por dias da semana</p>
                            <Chart
                                width={"100%"}
                                height={"100%"}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={g8}
                                options={{
                                    backgroundColor: "transparent",
                                    hAxis: {
                                        title: "",
                                    },
                                    vAxis: {
                                        title: "",
                                    },
                                }}
                                rootProps={{ "data-testid": "1" }}
                            />
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressao(
                                        pdfg8,
                                        `Inteiras por dias da semana período ${dateGlobal}  linha (${linhaName})  `, dadosPrevG8.total, dadosPrevG8.media
                                    )
                                }}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar dados
                            </Button>
                        </div>
                    </div>
                    <div className="row4_graph_2">
                        <div className="div_data_dashboard card4_graph_2">
                            <p className="title_card">Total de Passagens / Gratuidade comparação</p>
                            <Chart
                                width={getSizeGraph}
                                height={getSizeGraph}
                                chartType="ScatterChart"
                                loader={<div>Loading Chart</div>}
                                data={g4}
                                options={{
                                    hAxis: { title: 'Gratuidade', minValue: 0 },
                                    vAxis: { title: 'Passagens', minValue: 0 },
                                    legend: 'none',
                                    backgroundColor: "transparent"
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressaoComparacaao(
                                        dadosPrevG4,
                                        `Total de Passagens / Gratuidade comparação ${dateGlobal}  linha (${linhaName})  `
                                    )
                                }}
                                endIcon={<PictureAsPdfIcon />}
                            >
                                Exportar dados
                            </Button>
                        </div>
                        <div className="div_data_dashboard card3">
                            <p className="title_card">Total de Passagens / Estudantes comparação</p>
                            <Chart
                                width={getSizeGraph}
                                height={getSizeGraph}
                                chartType="ScatterChart"
                                loader={<div>Loading Chart</div>}
                                data={g5}
                                options={{
                                    hAxis: { title: 'Estudantes', minValue: 0 },
                                    vAxis: { title: 'Passagens', minValue: 0 },
                                    legend: 'none',
                                    backgroundColor: "transparent"
                                }}
                                rootProps={{ 'data-testid': '1' }}
                            />
                            <Button
                                color="primary"
                                onClick={() => {
                                    visualizarImpressaoComparacaao(
                                        dadosPrevG5,
                                        `Total de Estudantes / Passagens comparação ${dateGlobal}  linha (${linhaName})  `
                                    )
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
    return !validarCarregamento() ? loading() : areaGrafico2();
}

export default Grafico2;