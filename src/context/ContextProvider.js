import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => { },
    setTask: () => { },
    setToken: () => { },
    setMenuOpen: ()=>{},
    setNotification: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [task, setTask] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [menuOpen, setMenuOpen] = useState({});
    const [notification, _setNotification] = useState('');

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    return (
        <StateContext.Provider value={{
            user,
            task,
            setUser,
            setTask,
            token,
            setToken,
            menuOpen,
            setMenuOpen,
            notification,
            setNotification
        }}>
            {children}
        </StateContext.Provider>
    );
}

export const useStateContext = () => useContext(StateContext);
