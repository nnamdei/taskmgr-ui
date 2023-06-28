import { useEffect, useState } from "react";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getTasks();
    }, []);

    const onDeleteClick = task => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
        axiosClient.delete(`tasks/${task.id}`)
            .then(({ data }) => {
                setNotification('Task was successfully deleted');
                getTasks();
            });
    };

    const getTasks = () => {
        setLoading(true);
        axiosClient.get('tasks')
            .then(({ data }) => {
                console.log(data.data.length);
                setLoading(false);
                setTasks(data.data);
            })
            .catch(() => {
                setLoading(false);
                setTasks([]); // Set tasks to an empty array if there's an error
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <h1>Tasks</h1>
                <Link className="btn-add" to="/tasks/new">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}
                          {tasks.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">
                                  No tasks found
                                </td>
                            </tr>
                        )}
                        {!loading &&
                            tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/tasks/' + task.id}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(task)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
