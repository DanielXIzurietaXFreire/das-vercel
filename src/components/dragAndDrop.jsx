import React, { useState, useEffect } from 'react';
import './drag_and_drop.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addTaskToFirestore, getTasksFromFirestore, updateTaskInFirestore, deleteTaskFromFirestore } from '../FirebaseService';

// Definición del componente Header
const Header = ({ onLogout }) => {
    return (
        <header style={{ backgroundColor: '#000099', color: 'white' }} className="d-flex justify-content-between align-items-center py-3">
            <button onClick={onLogout} className="btn btn-danger me-3">Logout</button>
            <h1 className="text-center flex-grow-1">Task Management System</h1>
        </header>
    );
};

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <p>&copy; {new Date().getFullYear()} Task Management System. Izurieta Daniel - UTA.</p>
        </footer>
    );
};

export const DragAndDrop = ({ onLogout }) => { // Recibe onLogout como prop
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [userId, setUserId] = useState("defaultUserId"); // Puedes usar el ID de usuario real aquí

    // Fetch tasks from Firebase
    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getTasksFromFirestore(userId);
            setTasks(tasksData);
        };
        fetchTasks();
    }, [userId]);

    const getList = (list) => {
        return tasks.filter(item => item.status === list);
    };

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemId', item.id);
    };

    const draggingOver = (evt) => {
        evt.preventDefault();
    };

    const onDrop = async (evt, list) => {
        const itemId = evt.dataTransfer.getData('itemId');
        const item = tasks.find(item => item.id === itemId);
        item.status = list;

        await updateTaskInFirestore(item.id, { status: list });
        const newState = tasks.map(t => (t.id === itemId ? item : t));
        setTasks(newState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title,
            body,
            status: 1, // Por defecto "To Do"
            user_id: userId,
            created_at: new Date(),
        };
        if (editingTaskId) {
            await updateTaskInFirestore(editingTaskId, { title, body });
            setEditingTaskId(null);
        } else {
            await addTaskToFirestore(newTask);
        }
        setTitle('');
        setBody('');
        // Fetch tasks again after adding a new task
        const tasksData = await getTasksFromFirestore(userId);
        setTasks(tasksData);
    };

    const handleEdit = (item) => {
        setTitle(item.title);
        setBody(item.body);
        setEditingTaskId(item.id);
    };

    const handleDelete = async (id) => {
        await deleteTaskFromFirestore(id);
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <>
            <Header onLogout={onLogout} /> {/* Pasa onLogout al Header */}
            <div className="container my-4">
                <div className="card mb-4 mx-auto" style={{ width: '30rem', backgroundColor: '#000099', color: 'white' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Add Task</h5>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                                required
                                className="form-control mb-2"
                            />
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Description"
                                required
                                className="form-control mb-2"
                            />
                            <button type="submit" className="btn btn-light">
                                {editingTaskId ? 'Save Changes' : 'Add Task'}
                            </button>
                        </form>
                    </div>
                </div>
                <div className='drag-and-drop'>
                    {['To Do', 'In Progress', 'Done'].map((status, index) => (
                        <div key={status} className={`column column--${index + 1} text-center`}>
                            <h3>{status}</h3>
                            <div
                                className='dd-zone'
                                onDragOver={draggingOver}
                                onDrop={(evt) => onDrop(evt, index + 1)}
                            >
                                {getList(index + 1).map(item => (
                                    <div
                                        className='dd-element'
                                        key={item.id}
                                        draggable
                                        onDragStart={(evt) => startDrag(evt, item)}
                                    >
                                        <strong className='title'>{item.title}</strong>
                                        <p className='body'>{item.body}</p>
                                        <div className="d-flex justify-content-center">
                                            <button onClick={() => handleEdit(item)} className="btn btn-success me-2">Edit</button>
                                            <button onClick={() => handleDelete(item.id)} className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};