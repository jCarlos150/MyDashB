import Footer from "../../components/footer";
// import iconGrowing from "../../images/icons/icon_growing.png";
import giphy from "../../images/icons/giphy.gif";
//import axios from "axios";
import Chart from "react-google-charts";
import { useState, useEffect } from "react";
import axios from "axios";
import { grafico1endP, grafico2endP } from "../../routes-names";
import { useContext } from "react";
import { Context } from "../../myhooks/context/authContext";
import Shimmer from "react-shimmer-effect";
import StopIcon from '@material-ui/icons/Stop';
import { orderByDaysInPortuguese, mediaG, montarDataSemanal } from ".";
import { ImpressaoPassagens, ImpressaoEmpresas } from "./impressaoEmpresas";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Button } from "@material-ui/core";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
// import { orderByDaysInPortuguese } from ".";
//dateGlobal

const Grafico1 = () => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const getSizeGraph = "100%"
    const [g1, setG1] = useState([]);
    const [dadosPrevG1, setdadosPrevG1] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg1, setPDF1] = useState([])


    const [g2, setG2] = useState([]);
    const [dadosPrevG2, setdadosPrevG2] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg2, setPDF2] = useState([])

    const [g3, setG3] = useState([]);
    const [dadosPrevG3, setdadosPrevG3] = useState({
        total: 0,
        media: 0,
    });
    const [pdfg3, setPDF3] = useState([])




    const [maisViagens, setMaisViagens] = useState({})
    const [totalViagens, setViagens] = useState(0);
    const [totalPassagens, setPassagens] = useState(0);
    const { dateGlobal, codigoLine, linhaName } = useContext(Context);

    function validarCarregamento() {
        if (g1.length > 0 && g2.length > 0 && g3.length > 0) {
            return true;
        }
        return false;
    }

    const visualizarImpressao = async (vetor, title, total, media) => {
        //console.log("aqui")
        //console.log(vetor)



        const classeImpressao = new ImpressaoPassagens(vetor, title, total, media);
        const documento = await classeImpressao.PreparaDocumento()
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }
    const visualizarImpressaoEmpresas = async (vetor, title, total, media) => {
        //console.log("aqui")
        //console.log(vetor)



        const classeImpressao = new ImpressaoEmpresas(vetor, title, total, media);
        const documento = await classeImpressao.PreparaDocumento()
        pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
    }





    useEffect(() => {
        let firstPosition = ["Dia", "Total"]
        let g1Temp = [["Empresas", "Viagens"]];
        let mv = 0;
        let g2Temp = [["Passageiros", "Quantidade"]];
        let g3Temp = [firstPosition]
        let token = localStorage.getItem('token')

        let maisV = {
            "empresa": "",
            "quantidade": 0
        }
        let totalPassagensTemp = 0;
        //! filtragem de linha ainda não funciona com essa rota
        axios.get(grafico1endP + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalt = 0;
            let mediat = 0;

            for (let i in response.data) {
                g1Temp.push([response.data[i].nameOperator, response.data[i].count])
                if (response.data[i].count > mv) {
                    mv = response.data[i].count
                    maisV.quantidade = mv;
                    maisV.empresa = response.data[i].nameOperator;
                    totalt += response.data[i].count
                }

            }
            mediat = mediaG(totalt, response.data.length)


            let dadosG1 = {
                total: totalt,
                media: mediat,
            }
            setdadosPrevG1(dadosG1);


            setPDF1(response.data);
            setG1(g1Temp);
            setMaisViagens(maisV);
        })

        axios.get(grafico2endP + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            //let totalt = 0;
            let mediat = 0;
            let dados = [

            ];

            if (response.data[0] != null) {
                for (let [key, value] of Object.entries(response.data[0])) {
                    //console.log(key);
                    //.log(value)

                    if (value !== null && key !== "passengers") {
                        g2Temp.push([key, value]);
                        totalPassagensTemp += value;

                    }
                }

                dados[0] = {
                    "Inteiras": response.data[0].entire,
                    "Gratuidade": response.data[0].gratuity,
                    "Estudante": response.data[0].student
                }
                console.log(dados)



                mediat = mediaG(totalPassagensTemp, response.data.length)
                let dadosG1 = {
                    total: totalPassagensTemp,
                    media: mediat,
                }
                setdadosPrevG2(dadosG1);
                setPDF2(dados);

                setG2(g2Temp);
                setPassagens(totalPassagensTemp);
            }
        })

        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/week/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            let totalt = 0;
            let mediat = 0;
            for (let i in response.data) {
                g3Temp.push([response.data[i].dayWeek, response.data[i].count])
                totalt += response.data[i].count
            }
            mediat = mediaG(totalt, 7)
            let dadosG1 = {
                total: totalt,
                media: mediat,
            }
            setdadosPrevG3(dadosG1);
            let temp = montarDataSemanal(response.data, "dayWeek", "count")





            setPDF3(temp);

            console.log("Teste aqui")
            console.log(temp);

            setG3(orderByDaysInPortuguese(g3Temp, firstPosition));
        })

        axios.get("https://dashbus-api.herokuapp.com/ticketing/trips/count/" + dateGlobal + "/" + codigoLine, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((response) => {
            //  console.log(response.data);
            setViagens(response.data)
        })
    }, [dateGlobal, codigoLine])

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

    const areaGrafico1 = () => {
        return (
            <div className="container_grafico">
                <div className="rowMain">
                    <div className="row1">
                        <div className="row3">
                            <div className="div_data_dashboard card1">
                                <p className="title_card">Empresa que fez mais viagens</p>
                                <div>
                                    <p className="value_card value_positive">{maisViagens.quantidade}</p>
                                    <p className="message_value_card">viagens</p>
                                </div>
                                <p className="legenda_card">
                                    <span className="value_positive">{maisViagens.empresa}</span>
                                </p>
                            </div>
                            <div className="div_data_dashboard card2">
                                <p className="title_card">Total de viagens</p>
                                <div>
                                    <p className="value_card value_positive">{totalViagens}</p>
                                    <p className="message_value_card">viagens</p>
                                </div>
                                <p className="legenda_card">
                                    <span className="value_positive"> de {dateGlobal}</span>
                                </p>
                            </div>
                            <div className="div_data_dashboard card3">
                                <p className="title_card">Total de passagens</p>
                                <div>
                                    <p className="value_card value_positive">{totalPassagens}</p>
                                    <p className="message_value_card">de passagens vendidas</p>
                                </div>
                                <p className="legenda_card"> </p>
                            </div>
                        </div>
                        <div className="row4">
                            <div className="row5">
                                <div className="div_data_dashboard">
                                    <p className="title_card">Quantidade de viagens por empresa</p>
                                    <Chart width={getSizeGraph} height={getSizeGraph} chartType="BarChart" loader={<div>Loading
                                        Chart
                                    </div>}
                                        data={g1}
                                        chartLanguage={"pt-br"}
                                        options={{
                                            backgroundColor: "transparent",
                                            chartArea: { width: '45%' },
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
                                            visualizarImpressaoEmpresas(
                                                pdfg1,
                                                `Quantidade de viagens por empresa período (${dateGlobal})  linha: (${linhaName}) \n  empresa com mais viagens ${maisViagens["empresa"]} com ${maisViagens["quantidade"]} de viagens  `, dadosPrevG1.total, dadosPrevG1.media)
                                        }}
                                        endIcon={<PictureAsPdfIcon />}
                                    >
                                        Exportar dados
                                    </Button>
                                </div>
                            </div>
                            <div className="row6">
                                <div className="div_data_dashboard">
                                    <p className="title_card">Viagens por dia da semana</p>
                                    <Chart width={getSizeGraph} height={getSizeGraph} chartType="BarChart"
                                        loader={<div>Loading Chart</div>}
                                        data={g3}
                                        options={{
                                            backgroundColor: "transparent",
                                            chartArea: { width: '45%' },
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
                                            visualizarImpressaoEmpresas(pdfg3, `Viagens por dia da semana período (${dateGlobal})  linha: (${linhaName})`, dadosPrevG3.total, dadosPrevG3.media)
                                        }}
                                        endIcon={<PictureAsPdfIcon />}
                                    >
                                        Exportar dados
                                    </Button>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="row2">
                        <div className="div_data_dashboard_double">
                            <div className="div_top_card">
                                <p className="title_card">Quantidade de passagens</p>

                                {/* <p className="value_card value_positive">-</p> */}
                                <Chart width={getSizeGraph} height={getSizeGraph} chartType="PieChart" loader={<div>Loading Chart
                                </div>}
                                    data={g2}
                                    options={{
                                        pieSliceText: 'label',
                                        legend: 'none',
                                        chartArea: { width: '80%', height: '80%' },
                                        backgroundColor: "transparent"
                                    }}
                                    rootProps={{ "data-testid": "1" }}
                                />
                                <p className="legenda_card_left">
                                    <span>
                                        <StopIcon fontSize="small" style={{ color: "#3366CC" }} /> Inteiras
                                    </span>
                                    <span>
                                        <StopIcon fontSize="small" style={{ color: "#DC3912" }} /> Gratuidade
                                    </span>
                                    <span>
                                        <StopIcon fontSize="small" style={{ color: "#FF9900" }} /> Estudante
                                    </span>
                                    {/* <span className="value_positive" style={{ fontSize: "1.3rem" , color: "#3366CC" }}> {dateGlobal}</span>
                        */}
                                </p>
                                <br />
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        visualizarImpressao(pdfg2, `Quantidade de passagens período (${dateGlobal})  linha: (${linhaName})   `, dadosPrevG2.total, dadosPrevG2.media)
                                    }}
                                    endIcon={<PictureAsPdfIcon />}
                                >
                                    Exportar dados
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return !validarCarregamento() ? loading() : areaGrafico1();
}

export default Grafico1;