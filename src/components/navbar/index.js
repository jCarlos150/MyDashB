import './styles.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ArrowRightAlt';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
// import imageUser from '../../images/icons/user.png'
import { useContext } from "react";
import { Context } from "../../myhooks/context/authContext";
// import iconDownBlue from '../../images/icons/icon_down_blue.png'

const Navbar = (props) => {
    const { dateGlobal, codigoLine } = useContext(Context);
    const { handleDateGlobal, handleLine, aLterarlinhaName } = useContext(Context);
    const [linha, setLinha] = useState(codigoLine);
    const [open, setOpen] = useState(false);

    let dateInicial = new Date()
    let dateFinal = new Date()

    dateInicial.setFullYear(dateGlobal.split("/")[0].split("-")[0],
        parseInt(dateGlobal.split("/")[0].split("-")[1]) - 1,
        dateGlobal.split("/")[0].split("-")[2])

    dateFinal.setFullYear(dateGlobal.split("/")[1].split("-")[0],
        parseInt(dateGlobal.split("/")[1].split("-")[1]) - 1,
        dateGlobal.split("/")[1].split("-")[2])

    const [selectedDate, setSelectedDate] = useState(dateInicial);
    const [selectedDateEnd, setSelectedDateEnd] = useState(dateFinal);

    const linhas = [{
        "_id": "HD-IRMA DULCE-ANGELIM MIGUEL ROSA",
        "lineCod": 82
    },
    {
        "_id": "SOCOPO-CIDADE JARDIM SAO CRISTOVAO",
        "lineCod": 71
    },
    {
        "_id": "MOCAMBINHO DUQUE DE CAXIAS",
        "lineCod": 46
    },
    {
        "_id": "VILA BANDEIRANTE-PLANALTO ININGA FREI SERAFIM",
        "lineCod": 4
    },
    {
        "_id": "PARQUE PIAUI VIA BARAO DE GURGUEIA",
        "lineCod": 1710
    },
    {
        "_id": "SANTA SOFIA AV. JOSE S. SILVA",
        "lineCod": 48
    },
    {
        "_id": "NOVA TERESINA SAO CRISTOVAO",
        "lineCod": 167
    },
    {
        "_id": "HD-IRMA DULCE-BARAO",
        "lineCod": 83
    },
    {
        "_id": "JARDIM EUROPA-BOM PRINCIPIO J. XXIII",
        "lineCod": 27
    },
    {
        "_id": "MOCAMBINHO ASSEMBLEIA VIA SHOPPING",
        "lineCod": 47

    }]

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleDateEndChange = (date) => {
        setSelectedDateEnd(date);

    };

    const handleChange = (event) => {
        setLinha(event.target.value);
        let cod = event.target.value + ""
        handleLine(cod);
        aLterarlinhaName(cod);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseConfirm = () => {
        if (selectedDate < selectedDateEnd) {
            let dia = selectedDate.getDate() < 10 ? "0" + selectedDate.getDate() :
                selectedDate.getDate();
            let diaEnd = selectedDateEnd.getDate() < 10 ? "0" + selectedDateEnd.getDate() :
                selectedDateEnd.getDate();

            let dataglobal = selectedDate.getFullYear() + "-"
                + (selectedDate.getMonth() + 1) + "-" + dia + "/" + selectedDateEnd.getFullYear() + "-"
                + (selectedDateEnd.getMonth() + 1) + "-" + diaEnd
            handleDateGlobal(dataglobal);
            //alert(dataglobal);
            setOpen(false);
        }
        else {
            alert("A data inicial não pode ser maior que a atual");
        }
    };

    const body = (
        <div className="container_modal">
            <div className="div_modal">
                <div className="div_title_modal">
                    <h2 id="simple-modal-title">Selecionar o período</h2>
                    <span className="span_icon_close" onClick={handleClose}>
                        <CloseIcon color="disabled" />
                    </span>
                </div>
                <p id="simple-modal-description">
                    Período que será analisado...
                </p>
                <div className={"div_content_modal"}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Data inicial"
                            format="dd/MM/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="Data final"
                            format="dd/MM/yyyy"
                            value={selectedDateEnd}
                            onChange={handleDateEndChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="div_buttons_modal">
                    <Button variant="contained" color="primary" onClick={handleCloseConfirm}>
                        Confirmar
                    </Button>
                    <Button variant="contained" style={{ marginRight: "16px" }} onClick={handleClose}>
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <header className="nav">
                <div className="div_option_nav">
                    <p className="title_of_page">{props.title}</p>
                    <div className="div_buttons_navbar">
                        <span className="span_date_range_icon" onClick={handleOpen}>
                            <p>{selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}</p>
                            <ChevronRight fontSize="small" />
                            <p>{selectedDateEnd.getDate()}/{selectedDateEnd.getMonth() + 1}/{selectedDateEnd.getFullYear()}</p>
                            <DateRangeIcon fontSize="medium" />
                        </span>
                        <Select
                            label="OK"
                            id="demo-simple-select"
                            value={linha}
                            onChange={handleChange}
                        >
                            {linhas.map((linha) =>
                                <MenuItem value={linha.lineCod} key={linha.lineCod}>{linha._id}</MenuItem>
                            )}
                        </Select>
                    </div>
                </div>
            </header>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    )

}

export default Navbar;