import { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext,DropResult} from 'react-beautiful-dnd';
import { retrieveTickets, deleteTicket, updateTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';

import auth from '../utils/auth';

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number) : Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // Drag Event
  const handleDragEnd = async (result: DropResult) => {
    const {destination, source, draggableId } = result;
    //Dropped outside or in the same column, we do nothing

    if (!destination || destination.droppableId === source.droppableId) return;

    const ticketId = parseInt(draggableId);

    const ticketToUpdate = tickets.find((t) => t.id === ticketId);
    if (!ticketToUpdate) return;

    try{
      await updateTicket(ticketId, { ...ticketToUpdate, status: destination.droppableId});
      fetchTickets(); // reload after moving
    } catch (error) {
      console.error("Error updating ticket status", error);
    }
    };
  
  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if(loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
          <h1>
            Login to create & view tickets
          </h1>
        </div>  
      ) : (

        // DragDropContext enveloped
        <DragDropContext onDragEnd={handleDragEnd}>

          <div className='board'>
            <button type='button' id='create-ticket-link'>
              <Link to='/create' >New Ticket</Link>
            </button>
            <div className='board-display'>
              {boardStates.map((status) => {
                const filteredTickets = tickets.filter(ticket => ticket.status === status);
                return (
                  <Swimlane 
                    title={status} 
                    key={status} 
                    tickets={filteredTickets} 
                    deleteTicket={deleteIndvTicket}
                  />

                );
              })}
            </div>
          </div>
        </DragDropContext>
        )
    }
    </>
  );
};

export default Board;
