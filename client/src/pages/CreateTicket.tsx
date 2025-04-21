import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: 0,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: 1,
    assignedUser: null,
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to retrieve user info', err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createTicket(newTicket);
      navigate('/');
    } catch (err) {
      console.error('Failed to create ticket', err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({
      ...prev,
      [name]: name === 'assignedUserId' ? parseInt(value) : value,
    }));
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>

        <label htmlFor="tName">Ticket Name</label>
        <input
          id="tName"
          name="name"
          type="text"
          value={newTicket.name || ''}
          onChange={handleChange}
          required
        />

        <label htmlFor="tStatus">Ticket Status</label>
        <select
          id="tStatus"
          name="status"
          value={newTicket.status || ''}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <label htmlFor="tDescription">Ticket Description</label>
        <textarea
          id="tDescription"
          name="description"
          rows={4}
          value={newTicket.description || ''}
          onChange={handleChange}
        />

        <label htmlFor="tUserId">Assign to User</label>
        <select
          name="assignedUserId"
          id="tUserId"
          value={newTicket.assignedUserId || 0}
          onChange={handleChange}
        >
          {users.map(user => (
            <option key={user.id} value={user.id || 0}>
              {user.username}
            </option>
          ))}
        </select>

        <button type="submit">Submit Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;
