import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { retrieveUsers } from '../api/userAPI';
const CreateTicket = () => {
    const [newTicket, setNewTicket] = useState({
        id: 0,
        name: '',
        description: '',
        status: 'Todo',
        assignedUserId: 1,
        assignedUser: null,
    });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const getAllUsers = async () => {
        try {
            const data = await retrieveUsers();
            setUsers(data);
        }
        catch (err) {
            console.error('Failed to retrieve user info', err);
        }
    };
    useEffect(() => {
        getAllUsers();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTicket(newTicket);
            navigate('/');
        }
        catch (err) {
            console.error('Failed to create ticket', err);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTicket(prev => ({
            ...prev,
            [name]: name === 'assignedUserId' ? parseInt(value) : value,
        }));
    };
    return (_jsx("div", { className: "form-container", children: _jsxs("form", { className: "form-card", onSubmit: handleSubmit, children: [_jsx("h1", { children: "Create Ticket" }), _jsx("label", { htmlFor: "tName", children: "Ticket Name" }), _jsx("input", { id: "tName", name: "name", type: "text", value: newTicket.name || '', onChange: handleChange, required: true }), _jsx("label", { htmlFor: "tStatus", children: "Ticket Status" }), _jsxs("select", { id: "tStatus", name: "status", value: newTicket.status || '', onChange: handleChange, children: [_jsx("option", { value: "Todo", children: "Todo" }), _jsx("option", { value: "In Progress", children: "In Progress" }), _jsx("option", { value: "Done", children: "Done" })] }), _jsx("label", { htmlFor: "tDescription", children: "Ticket Description" }), _jsx("textarea", { id: "tDescription", name: "description", rows: 4, value: newTicket.description || '', onChange: handleChange }), _jsx("label", { htmlFor: "tUserId", children: "Assign to User" }), _jsx("select", { name: "assignedUserId", id: "tUserId", value: newTicket.assignedUserId || 0, onChange: handleChange, children: users.map(user => (_jsx("option", { value: user.id || 0, children: user.username }, user.id))) }), _jsx("button", { type: "submit", children: "Submit Ticket" })] }) }));
};
export default CreateTicket;
