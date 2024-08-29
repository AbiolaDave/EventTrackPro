import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNewEvent, viewEvent } from "../redux/newEvent";

const style = {
  width: "250px",
};

const CounterMenu = () => {
  const dispatch = useDispatch();
  const [create, setcreate] = useState(false);

  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent);

  return (
    <>
      <div className="admin">
        <div className="mt-5 d-flex text-success">
          <a className="loginstyle" href="/eventtrackpro/">
            <i
              class="fa-solid fa-house fa-xl mx-2 my-2"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold">Home</h5>
          </a>
        </div>
        <div
          onClick={() => dispatch(startNewEvent())}
          className="mt-5 d-flex loginstyle"
        >
          <a className="loginstyle">
            <i
              class="fa-regular fa-calendar-days fa-2xl mx-2 my-2"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold">Scan Events</h5>
          </a>
        </div>
        <div
          onClick={() => dispatch(viewEvent())}
          className="mt-5 d-flex loginstyle"
        >
          <a className="loginstyle">
            <i
              class="fa-solid fa-eye fa-2xl mx-2 my-2"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold">View Events</h5>
          </a>
        </div>
        <div className="mt-5 d-flex text-success ">
          <a className="loginstyle" href="/eventtrackpro/adminlogin">
            <i
              class="fa-solid fa-right-to-bracket fa-2xl mx-2 my-2"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold">Admin LogIn</h5>
          </a>
        </div>
        <div className="mt-5 d-flex text-success">
          <a className="loginstyle" href="/eventtrackpro/countcoordinatorlogin">
            <i
              class="fa-solid fa-right-to-bracket fa-2xl mx-2 my-3"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold coord">Count-Coodinator</h5>
          </a>
        </div>
      </div>
    </>
  );
};

export default CounterMenu;
