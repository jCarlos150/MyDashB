import { googleendpoint } from "./routes-names"
import axios from 'axios';

export const googleLogin = () => {
    axios.get(googleendpoint).then(function (response) {
        //alert(response);
    })
}