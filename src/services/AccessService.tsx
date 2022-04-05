import axios from "axios"
import { URL_API } from "./Api"

export async function signUp(values: any) {
    return await axios.post(URL_API + `register/local/`, values)
}

export async function login(values: any) {
    return await axios.post(URL_API + `auth/local/`, values)
}