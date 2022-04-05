import React from 'react-router-dom'

import './styles.css'

const Status = ({ cor, texto }) => {
    var cl = "";

    if (cor === 'verde') {
        cl = "verde"
    }
    else if (cor === 'vermelho') {
        cl = "vermelho"
    } else {
        cl = "preto"
    }

    return (

        <h2 className={cl}>{texto}</h2>

    )
}

export default Status;

