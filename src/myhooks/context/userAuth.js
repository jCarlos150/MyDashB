
import { useState, useEffect } from "react";
import history from "../../history";
import UserIcon from "../../images/icons/user.png";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("User");
    const [imgUser, setImgUser] = useState(UserIcon);
    const [dateGlobal, setDateGlobal] = useState("2020-11-01/2020-11-30");
    const [codigoLine, setCodigoLine] = useState("82");
    const [emailUser, setEmailUser] = useState();
    const [linhaName, setLinhaName] = useState("HD-IRMA DULCE-ANGELIM MIGUEL ROSA")


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
        setLoading(false);
    }, [])

    function aLterarlinhaName(cod) {


        switch (cod) {

            case "71":
                setLinhaName("SOCOPO-CIDADE JARDIM SAO CRISTOVAO")
                break;
            case "46":
                setLinhaName("MOCAMBINHO DUQUE DE CAXIAS")
                break;
            case "4":
                setLinhaName("VILA BANDEIRANTE-PLANALTO ININGA FREI SERAFIM")
                break
            case "1710":
                setLinhaName("PARQUE PIAUI VIA BARAO DE GURGUEIA")
                break;
            case "48":
                setLinhaName("SANTA SOFIA AV. JOSE S. SILVA")
                break;
            case "167":
                setLinhaName("NOVA TERESINA SAO CRISTOVAO")
                break;
            case "83":
                setLinhaName("HD-IRMA DULCE-BARAO")
                break;
            case "27":
                setLinhaName("JARDIM EUROPA-BOM PRINCIPIO J. XXIII")
                break;
            case "47":
                setLinhaName("MOCAMBINHO ASSEMBLEIA VIA SHOPPING")
                break;

            default:
                setLinhaName("HD-IRMA DULCE-ANGELIM MIGUEL ROSA")
                break;






        }
    }



    function handleLogin() {
        setAuthenticated(true)
        localStorage.setItem('token', authenticated)
        history.push('/informacoes-gerais');
    }

    function handleDateGlobal(date) {
        setDateGlobal(date);
    }
    function handleLine(codigo) {
        setCodigoLine(codigo);
    }

    function handleLoginSocial() {
        setAuthenticated(true);
        history.push('/informacoes-gerais');
    }

    function alterarUsuario(nome) {
        setUser(nome);
    }
    function alterarEmail(email) {
        setEmailUser(email);
    }

    function alterarImg(imagem) {
        setImgUser(imagem);
    }

    function handleLogout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        history.push('/');
    }

    return { authenticated, loading, handleLogin, handleLogout, user, alterarUsuario, alterarImg, imgUser, handleLoginSocial, handleDateGlobal, dateGlobal, handleLine, codigoLine, alterarEmail, emailUser, linhaName, aLterarlinhaName }
}