import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import TicketCard from './TicketCard';
// Draggable
import { Droppable, Draggable } from 'react-beautiful-dnd';
const Swimlane = ({ title, tickets, deleteTicket }) => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Todo':
                return 'swim-lane todo';
            case 'In Progress':
                return 'swim-lane inprogress';
            case 'Done':
                return 'swim-lane done';
            default:
                return 'swim-lane';
        }
    };
    return (
    // Droppable
    _jsx(Droppable, { droppableId: title, children: (provided) => (_jsxs("div", { className: `swimlane ${getStatusClass(title)}`, ref: provided.innerRef, ...provided.droppableProps, children: [_jsx("h2", { children: title }), tickets.map((ticket, index) => (_jsx(Draggable, { draggableId: String(ticket.id), index: index, children: (provided) => (_jsx("div", { ref: provided.innerRef, ...provided.draggableProps, ...provided.dragHandleProps, children: _jsx(TicketCard, { ticket: ticket, deleteTicket: deleteTicket }) })) }, ticket.id))), provided.placeholder] })) }));
};
export default Swimlane;
