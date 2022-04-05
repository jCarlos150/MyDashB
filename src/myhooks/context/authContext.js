import React, { createContext } from 'react';
import useAuth from './userAuth';

const Context = createContext();

function AuthProvider({ children }) {
    const {
        authenticated, loading, handleLogin, handleLogout,
        user, alterarUsuario, alterarImg, imgUser,
        handleLoginSocial, handleDateGlobal, dateGlobal,
        handleLine, codigoLine, alterarEmail, emailUser, linhaName, aLterarlinhaName
    } = useAuth();

    return (
        <Context.Provider value={{
            loading, authenticated,
            handleLogin, handleLogout, user, alterarUsuario, alterarImg,
            imgUser, handleLoginSocial, handleDateGlobal,
            alterarEmail, emailUser,
            dateGlobal, handleLine, codigoLine, linhaName, aLterarlinhaName
        }}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider }