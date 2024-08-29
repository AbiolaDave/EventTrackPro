import React from "react";
import { useDispatch } from "react-redux";
import img13 from "../../multimedia/Designer(10).jpeg";
import img12 from "../../multimedia/Designer(15).jpeg";
import img10 from "../../multimedia/Designer(22).jpeg";
import img6 from "../../multimedia/Designer(23).jpeg";
import { addCounter, startNewEvent, viewEvent } from "../redux/newEvent";

const CountCoordinatorBody = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      {/* <div> */}
      <div className="heroe">
        <div className="container d-flex cov">
          <div className="simplified">
            <img src={img13} alt="" />
          </div>
          <div className="enroll mx-5 mt-5">
            <h1>Simplified Event Tracking</h1>
            <p>
              Easy records keeping for events. Keep track of event attendance,
              event growth and event dates. Create events to keep records of
              event attendance. Count coordinator and counters are assigned to
              take event counts by scanning event Qr-Code.
            </p>
          </div>
        </div>
        <div class="blog-grid">
          <div class="box0">
            <img src={img12} alt="" />
            <div class="tag">Events</div>
            <div className="divide">
              <h5 class="">Create Events</h5>
              <p>
                Create event and set event date. Every event has a unique
                qr-code which count coordinators and counters must scan.
              </p>
            </div>
            <hr />
            <div class="author">
              <button
                onClick={() => dispatch(startNewEvent())}
                className="btn btn-success mx-3"
              >
                Create Event
              </button>
            </div>
          </div>
          <div class="box0">
            <img src={img6} alt="" />
            <div class="tag p-2">Counter</div>
            <div className="divide">
              <h5>Add Counter</h5>
              <p>
                Add counter by scanning their personal qr-code. Counters take
                count of event attendance
              </p>
            </div>
            <hr />
            <div class="author d-flex">
              <button
                onClick={() => dispatch(addCounter())}
                className="btn btn-success mx-3"
              >
                Add Counters
              </button>
            </div>
          </div>
          <div class="box0">
            <img src={img10} alt="" />
            <div class="tag">All Events</div>
            <h5>View Events</h5>
            <p>
              View all your events to edit or delete events, view events
              records, details and monitor event growth.
            </p>
            <hr />
            <div class="author d-flex">
              <button
                onClick={() => dispatch(viewEvent())}
                className="btn btn-success mx-3"
              >
                All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountCoordinatorBody;
