import { useStateContext } from "../context/ContextProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const { token, task, setTask, setToken, notification } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <div id="defaultLayout">
            Dashboard
        </div>
    )
}