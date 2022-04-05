
import React, { useEffect } from "react";
import { useLocation } from 'react-router'
//import { Context } from "../../myhooks/context/authContext";
import { useHistory } from "react-router-dom";
import { home_endpoint } from "../../routes-names";

const Sucess = () => {
    const history = useHistory()
    const location = useLocation();
    //const { handleLoginSocial } = useContext(Context);



    useEffect(() => {
        const id = location.search
        let token = id.substring(7);
        localStorage.setItem('token', token)
        history.replace(home_endpoint)
    }, [])



    return (
        <div className="body_login_">
            <p>ok</p>
        </div>
    );
};

export default Sucess;
