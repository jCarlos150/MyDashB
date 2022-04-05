import React from 'react'

import './styles.css'

const Descricao = ({ texto1, texto2, cor }) => {
    var cl = "";

    if (cor === 'verde') {
        cl = "gr"
    } else if (cor === 'red') {
        cl = "vermelho"
    }


    return (

        <p className="descricao"><span className={cl}>{texto1}</span>{texto2}</p>
    )
}

export default Descricao;