import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { retrieveTickets, deleteTicket, updateTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import auth from '../utils/auth';
const boardStates = ['Todo', 'In Progress', 'Done'];
const Board = () => {
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const [loginCheck, setLoginCheck] = useState(false);
    const checkLogin = () => {
        if (auth.loggedIn()) {
            setLoginCheck(true);
        }
    };
    const fetchTickets = async () => {
        try {
            const data = await retrieveTickets();
            setTickets(data);
        }
        catch (err) {
            console.error('Failed to retrieve tickets:', err);
            setError(true);
        }
    };
    const deleteIndvTicket = async (ticketId) => {
        try {
            const data = await deleteTicket(ticketId);
            fetchTickets();
            return data;
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    // Drag Event
    const handleDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        //Dropped outside or in the same column, we do nothing
        if (!destination || destination.droppableId === source.droppableId)
            return;
        const ticketId = parseInt(draggableId);
        const ticketToUpdate = tickets.find((t) => t.id === ticketId);
        if (!ticketToUpdate)
            return;
        try {
            await updateTicket(ticketId, { ...ticketToUpdate, status: destination.droppableId });
            fetchTickets(); // reload after moving
        }
        catch (error) {
            console.error("Error updating ticket status", error);
        }
    };
    useLayoutEffect(() => {
        checkLogin();
    }, []);
    useEffect(() => {
        if (loginCheck) {
            fetchTickets();
        }
    }, [loginCheck]);
    if (error) {
        return _jsx(ErrorPage, {});
    }
    return (_jsx(_Fragment, { children: !loginCheck ? (_jsx("div", { className: 'login-notice', children: _jsx("h1", { children: "Login to create & view tickets" }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "kanban-header", children: [_jsx("h1", { className: "kanban-title", children: "Krazy Kanban Board" }), _jsxs("div", { className: "kanban-actions", children: [_jsx(Link, { to: "/create", className: "new-ticket-btn", children: "New Ticket" }), _jsx("button", { className: "logout-btn", onClick: () => auth.logout(), children: "Logout" })] })] }), _jsx(DragDropContext, { onDragEnd: handleDragEnd, children: _jsx("div", { className: 'board-display', children: boardStates.map((status) => {
                            const filteredTickets = tickets.filter(ticket => ticket.status === status);
                            return (_jsx(Swimlane, { title: status, tickets: filteredTickets, deleteTicket: deleteIndvTicket }, status));
                        }) }) })] })) }));
};
export default Board;
