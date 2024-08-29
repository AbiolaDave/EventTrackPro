import axios from "axios";
import React, { useEffect, useState } from "react";

const AddRow = ({ eventId }) => {
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);

   useEffect(() => {
     const fetchEvents = async () => {
       try {
         const response = await axios.get(
           "https://eventtrackpro-backend.onrender.com/admin/adminpage"
         );
         setEvents(response.data);
       } catch (error) {
         console.error("Error fetching events:", error);
       }
     };

     fetchEvents();
   }, []);

  const renderCounters = () => {
    if (!event) {
      return <p>Loading...</p>;
    }
    const counters = [];
    for (let i = 1; i <= event.addRow; i++) {
      counters.push(
        <div key={i}>
          <h3>Counter {i}</h3>
          {/* Add input fields or UI elements for the admin to manage counters */}
        </div>
      );
    }

    return counters;
  };

  return (
    <div>
      {event && (
        <div>
          <h2>{event.eventName}</h2>
          <p>Date: {event.setDate}</p>
          {/* Add more event details if needed */}
          {renderCounters()}
        </div>
      )}
    </div>
  );
};

export default AddRow;
