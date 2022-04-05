import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { home_endpoint } from "../../routes-names";

const SucessRedirect = () => {
    const history = useHistory()
    const url = window.location.href
    const urlobject = url.split('=');
    const token = urlobject[1];

    useEffect(() => {
        history.replace(home_endpoint)
    })

    return (
        <span>{token}</span>
    )
}

export default SucessRedirect;