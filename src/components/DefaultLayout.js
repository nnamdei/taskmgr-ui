/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import {
    FaRegWindowClose
} from 'react-icons/fa';
import { Link, Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
    const {
        token,
        user,
        setUser,
        setToken,
        setNotification,
        menuOpen,
        setMenuOpen,
        notification,
    } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = event => {
        event.preventDefault();
        axiosClient.post('logout')
            .then(({ data }) => {
                setUser({});
                setToken(null);
                setNotification('Logout successful');
            });
    };

    useEffect(() => {
        axiosClient.get('user')
            .then(({ data }) => {
                setUser(data);
            });
    });

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div id="defaultLayout">
            <header>
                <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => toggleMenu()}></div>
                <div>
                    TaskMgr
                </div>

                <div>
                    {user.name} &nbsp; &nbsp;
                    <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
                </div>
            </header>

            <aside className={`menu ${menuOpen ? 'open' : ''}`}>

                <button
                    className="mobile-nav-btn"
                    onClick={() => toggleMenu()}
                >
                    <FaRegWindowClose size={24} />
                </button>

                <Link to="/dashboard">Home</Link>
                <Link to="/tasks">Tasks</Link>
            </aside>
            <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => toggleMenu()}></div>
            <button className="menu-toggle" onClick={() => toggleMenu()}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className="content">
                <main>
                    <Outlet />
                </main>
                {notification && (
                    <div className="notification">
                        {notification}
                    </div>
                )}
            </div>
        </div>
    );
}
