import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => { },
    setTask: () => { },
    setToken: () => { },
    setNotification: () => { }
})

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [task, setTask] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');
}

export const useStateContext = () => useContext(StateContext);
