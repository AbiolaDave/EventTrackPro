import React from "react";
import img6 from "../multimedia/event-image.jpg";
import img29 from "../multimedia/ushers.jpg";
import img10 from "../multimedia/event33.jpg";
import img11 from "../multimedia/security2.png";

const BodyHome = () => {
  const style = {
    overflow: "hidden"
  }
  return (
    <>
      <aside className="min-vh-100 era">
        <div className="debit">
          <span>
            <img src={img6} alt="" />
          </span>
          <span className="diva">
            <h1>Create New Event, Update Events And Records, Add Counter</h1>
          </span>
          <span>
            <p>
              Start new event to keep tracks of all attendees, monitor your
              event growth, add count-coordinator and counters by simply
              scanning your QR-Code
            </p>
          </span>
        </div>
        <div className="counter">
          <span>
            <img src={img29} alt="" />
          </span>
          <span className="diva">
            <h1>
              Register As Count-Coordinator Or Counter And Take Event Count
            </h1>
          </span>
          <span>
            <p>
              Register as a count-coordinator to assign counters and coordinate
              count or, sign in as counter to take event count by simply
              scanning admin's QR-code
            </p>
          </span>
        </div>

        <div>
          <div className="pension">
            <span>
              <img src={img10} alt="" />
            </span>
            <span className="diva">
              <h1>
                View And Keep Track Of All Your Events, Edit Or Delete Events
              </h1>
            </span>
            <span>
              <p>
                View all your events to edit or delete events, view events
                records and details. Monitor your event growth.
              </p>
            </span>
          </div>
        </div>
        <div className="secure">
          <span>
            <img src={img11} alt="" />
          </span>
          <span className="diva">
            <h1>Your Security is our Priority</h1>
          </span>
          <span>
            <p>
              We ensure the security of your of your personal information
              together with the security of your events records.
            </p>
          </span>
        </div>
      </aside>
    </>
  );
};

export default BodyHome;
