import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import Dashboard from "./views/Dashboard";
import Tasks from "./views/Tasks";
import TaskForm from "./views/TaskForm";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/tasks" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/tasks',
                element: <Tasks />
            },
            {
                path: '/tasks/new',
                element: <TaskForm key="taskCreate" />
            },
            {
                path: '/tasks/:id',
                element: <TaskForm key="taskUpdate" />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;