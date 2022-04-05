import React, { useContext, useState } from "react";
import Footer from "../../components/footer";
import Chart from "react-google-charts";
import {
    Slide,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    FormControl,
    Input,
    InputLabel,
    LinearProgress,
    Snackbar
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import areaChartIcon from "../../images/icons/area_chart.PNG";
import barChartIcon from "../../images/icons/bar_chart.PNG";
import collumnChartIcon from "../../images/icons/collumn_chart.PNG";
import comboChartIcon from "../../images/icons/combo_chart.PNG";
import lineChartIcon from "../../images/icons/line_chart.PNG";
import pieChartIcon from "../../images/icons/pie_chart.PNG";
import scatterChartIcon from "../../images/icons/scatter_chart.PNG";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Context } from "../../myhooks/context/authContext";
import { createDateFromData, getDataForGraph, getDateList, maskDate } from ".";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const Grafico4 = () => {
    const [showGraph, setShowGraph] = useState(false)
    const [showGraphLoading, setShowGraphLoading] = useState(false)
    const [openSnackError, setOpenSnackError] = useState(false);
    const [erroPlotGrafico, setErroPlotGrafico] = useState("");
    const [showDialog, setShowDialog] = useState(false)
    const { dateGlobal, codigoLine } = useContext(Context);
    const [graphTypes, setGraphTypes] = useState([
        [
            { id: 1, name: "Gráfico de Área", type: "AreaChart", img: areaChartIcon, selected: false },
            { id: 2, name: "Gráfico de barra", type: "Bar", img: barChartIcon, selected: false },
        ], [
            { id: 3, name: "Gráfico de coluna", type: "BarChart", img: collumnChartIcon, selected: false },
            { id: 4, name: "Gráfico de combo", type: "ComboChart", img: comboChartIcon, selected: false },
        ], [
            { id: 5, name: "Gráfico de linha", type: "LineChart", img: lineChartIcon, selected: false },
            { id: 6, name: "Gráfico de torta", type: "PieChart", img: pieChartIcon, selected: false },
        ], [
            { id: 7, name: "Gráfico de dispersão", type: "ScatterChart", img: scatterChartIcon, selected: false },
        ]
    ])
    const [selected, setSelected] = useState({ id: 0, name: "-", type: "-" })
    const [dataTypeSelectedX, setDataTypeSelectedX] = useState([])
    const [firstPosition, setFirstPosition] = useState(["Dia"])
    const [g1, setG1] = useState([firstPosition]);
    const dataTypes = [
        "Total de passageiros", //0
        "Quantidade de estudantes", //1
        "Quantidade de gratuidades", //2
        "Quantidade de inteiras", //3
        "Quantidade de viagens", //4
    ]
    const handleGraph = () => {
        if (firstPosition.length === 1) {
            setErroPlotGrafico("Selecione os dados...")
            setOpenSnackError(true)
        } else if (selected.type == "-") {
            setErroPlotGrafico("Selecione o tipo de gráfico...")
            setOpenSnackError(true)
        } else {
            let dateStart = createDateFromData(dateGlobal.split("/")[0].split("-"))
            let dateEnd = createDateFromData(dateGlobal.split("/")[1].split("-"))

            let dates = getDateList(dateStart, dateEnd)
            plotGraph(dates, firstPosition)
            setShowGraph(false)
            setShowGraphLoading(true)
        }
    }

    const setGraphTypeSelected = (id) => {
        let newGraphs = []
        let newSelected = { id: 0, name: "-", type: "-" }
        graphTypes.map((it) => {
            let obj = []
            it.map((opt) => {
                if (opt.id === id) {
                    opt.selected = true
                    newSelected.id = opt.id
                    newSelected.name = opt.name
                    newSelected.type = opt.type
                } else {
                    opt.selected = false
                }
                obj.push(opt)
            })
            newGraphs.push(obj)
        })
        setSelected(newSelected)
        setGraphTypes(newGraphs)
    }

    const plotGraph = async (dias, newList) => {
        let newData = []; let value = 0;
        let data = []; let type = 0;

        for (let index = 0; index < dias.length; index++) {
            data = []
            data.push(maskDate(dias[index]))

            for (let index_2 = 0; index_2 < newList.length - 1; index_2++) {
                type = newList.indexOf(newList[index_2])
                value = await getDataForGraph(type, dias[index], codigoLine)
                console.log(maskDate(dias[index]))
                console.log(value)
                data.push(value)
            }
            newData.push(data)
        }
        setG1([newList].concat(newData))
        setShowGraphLoading(false)
        setShowGraph(true)
    }

    const handleOpenDialog = () => setShowDialog(true)
    const handleCloseDialog = () => setShowDialog(false)
    const handleChangeDataTypeX = (event) => {
        setDataTypeSelectedX(event.target.value)
        let newList = ["Dia"]
        newList = newList.concat(event.target.value)
        setFirstPosition(newList)
    }

    return (
        <div className="container_grafico">
            <Snackbar
                open={openSnackError}
                autoHideDuration={5000}
                onClose={() => setOpenSnackError(false)}
                anchorOrigin={{vertical: "center", horizontal: "center"}}
            >
                <Alert onClose={() => setOpenSnackError(false)} severity="error">
                    {erroPlotGrafico}
                </Alert>
            </Snackbar>
            <Dialog
                open={showDialog}
                TransitionComponent={Transition}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Selecione o tipo de gráfico"}</DialogTitle>
                <DialogContent>
                    <div>
                        {graphTypes.map((it) => {
                            return (
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    {it.map((opt) => {
                                        return (
                                            <div onClick={() => setGraphTypeSelected(opt.id)} className={"div_graph_option " + (opt.selected ? "div_graph_option_selected" : "")}>
                                                <img src={opt.img} />
                                                <p>{opt.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="rowMain">
                <div className="container_data_painel">
                    <div className="div_data_dashboard">
                        <DialogTitle id="alert-dialog-slide-title">{"Monte o gráfico"}</DialogTitle>

                        <div style={{ height: "100%" }}>
                            <InputLabel id="demo-mutiple-checkbox-label" style={{ marginBottom: "4px", marginTop: "16px" }}>Tipo de gráfico</InputLabel>
                            <Button variant="outlined" endIcon={<ArrowDropDownIcon />} onClick={handleOpenDialog} color="primary" disableElevation>
                                {selected.id === 0 ? "Selecionar o tipo de gráfico" : selected.name}
                            </Button>

                            <FormControl style={{ marginTop: "16px", minWidth: "100%", maxWidth: "200px" }}>
                                <InputLabel id="demo-mutiple-checkbox-label">Dados do eixo X</InputLabel>
                                <Select
                                    multiple
                                    label="OK"
                                    id="demo-simple-select"
                                    className="select_date_type"
                                    input={<Input />}
                                    value={dataTypeSelectedX}
                                    onChange={handleChangeDataTypeX}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {dataTypes.map((dataType) =>
                                        <MenuItem value={dataType} key={dataType}>
                                            <Checkbox checked={dataTypeSelectedX.indexOf(dataType) > -1} />
                                            <ListItemText primary={dataType} />
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                        <Button variant="contained" onClick={handleGraph} color="primary" disableElevation>
                            Gerar Gráfico
                        </Button>
                        <p>{firstPosition.length}</p>
                    </div>
                </div>
                <div className="container_data_graph">
                    {showGraph ? (
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType={selected.type}
                            loader={<div>Loading Chart</div>}
                            data={g1}
                            options={{
                                title: '',
                                hAxis: { titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                animation: {
                                    startup: true,
                                    easing: 'linear',
                                    duration: 1500,
                                }
                                // For the legend to fit, we make the chart area smaller
                                // chartArea: { width: '50%', height: '70%' },
                                // lineWidth: 25
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    ) : (
                        <span>
                            {
                                showGraphLoading ? (
                                    <span>
                                        <p className={"label_load_graph"}>Carregando os dados do gráfico</p>
                                        <p className={"sub_label_load_graph"}>Pode levar alguns instantes...</p>
                                        <br />
                                        <LinearProgress />
                                    </span>
                                ) : (
                                    <p className={"label_load_graph"}>O gráfico será exibido aqui.</p>
                                )
                            }
                        </span>
                    )}
                </div>
            </div>
            <Footer />
        </div >
    )
}


export default Grafico4;