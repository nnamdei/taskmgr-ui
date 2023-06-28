import { useEffect, useState } from "react"
import { useStateContext } from "../context/ContextProvider"
import axiosClient from "../axios-client"
import { useNavigate, useParams } from "react-router-dom";

export default function TaskForm() {

    const navigate = useNavigate();
    let { id } = useParams();
    const [task, setTask] = useState({
        id: null,
        title: '',
        description: '',
        status: ''
    })

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`tasks/${id}`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false);
                    setTask(data.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [id]);

    const onSubmit = ev => {
        ev.preventDefault();
        const endpoint = task.id ? `tasks/${task.id}` : 'tasks/create-task';
        axiosClient
            .post(endpoint, task)
            .then(({ data }) => {
                setNotification('Action completed');
                navigate('/tasks');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };


    return (
        <>
            {task.id && <h2>Update task: {task.title}</h2>}
            {!task.id && <h2>New Task</h2>}
            <div className="card animated fadeInDown">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input required value={task.title} onChange={ev => setTask({ ...task, title: ev.target.value })} placeholder="Title" />
                        <input required value={task.description} onChange={ev => setTask({ ...task, description: ev.target.value })} placeholder="Description" />
                        <select
                            className="dropdown-select"
                            value={task.status}
                            onChange={(ev) => setTask({ ...task, status: ev.target.value })}
                        >
                            <option value="">Select a status</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button className="btn" >Submit</button>
                    </form>
                )}
            </div>
        </>
    )
}