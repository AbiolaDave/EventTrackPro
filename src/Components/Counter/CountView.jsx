import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CountView = (props) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const sendReq = async () => {
      try {
        let url =
          "https://eventtrackpro-backend.onrender.com/admin/adminpage/events";
        let admin = props.admin;
        let AdminqrCode = props.AdminqrCode;
        axios.post(url, { admin, AdminqrCode }).then((response) => {
          if (!response.data.status) {
            console.log(response.data.message);
          } else {
            // localStorage.token = response.data.token;
            console.log(response.data.message, "message");
            setEvents(response.data.events);

            console.log(AdminqrCode);
          }
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    sendReq();
  }, []);

  return (
    <div>
      <div className="create">
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">All Events</h3>
        </div>
        <div className="text-success">
          {events.length > 0 ? (
            events.map((eachEvent) => (
              <ul className="text-success" key={eachEvent.eventId}>
                <li>
                  <Link
                    to={`/eventtrackpro/adminpage/${eachEvent.eventId}`}
                    key={eachEvent.eventId}
                  >
                    {console.log(events, eachEvent.eventId)}
                    <p>Date: {eachEvent.setDate}</p>
                    <p>Name: {eachEvent.eventName}</p>
                    <p>Rows: {eachEvent.addRow}</p>
                    <p>Event ID: {eachEvent.eventId}</p>
                    <p>Unique ID: {eachEvent.uniqueId}</p>
                    <p>Admin: {eachEvent.admin}</p>
                    {/* <p>qr {props.AdminqrCode}</p> */}
                    <img src={props.AdminqrCode} alt="" />
                  </Link>
                </li>
              </ul>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountView;
