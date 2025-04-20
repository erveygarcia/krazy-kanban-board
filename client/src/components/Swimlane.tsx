import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
// Draggable
import { Droppable, Draggable} from 'react-beautiful-dnd';



interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
}

const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
  const getStatusClass = (status: string) => {
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
    <Droppable droppableId={title}>
      {(provided) => (
        <div 
          className={`swimlane ${getStatusClass(title)}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{title}</h2>

          {/* Draggable */}
          {tickets.map((ticket, index) => (
            <Draggable draggableId={String(ticket.id)} index={index} key={ticket.id}>
              {(provided)  => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TicketCard 
                    ticket={ticket}
                    deleteTicket={deleteTicket}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {/*This enables that react-beautiful-dnd calculate the riught scpace */}
          {provided.placeholder}
        </div> 
      )}
    </Droppable> 
  );
};

export default Swimlane;
