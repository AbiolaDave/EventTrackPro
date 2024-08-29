import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCounter, startNewEvent, viewEvent } from "../redux/newEvent";

const style = {
  width: "250px",
};

const AdminMenu = () => {
  const dispatch = useDispatch();

  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent);

  return (
    <>
      <div className="admin">
        <div className="mt-5  text-success">
          <a className="loginstyle" href="/">
            <i
              className="fa-solid fa-house fa-xl mx-1 my-2 icons"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold menu-actions">Home</h5>
          </a>
        </div>
        <div
          onClick={() => dispatch(startNewEvent())}
          className="mt-5  loginstyle"
        >
          <i
            className="icons fa-regular fa-calendar-days fa-2xl mx-1 my-2"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold menu-actions">New Events</h5>
        </div>
        <div
          onClick={() => dispatch(addCounter())}
          className="mt-5  loginstyle"
        >
          <i
            className="icons fa-solid fa-users fa-2xl mx-1 my-3"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold menu-actions">Add Counters</h5>
        </div>
        <div
          onClick={() => dispatch(viewEvent())}
          className="mt-5  loginstyle"
        >
          <i
            className="icons fa-solid fa-eye fa-xl mx-1 my-2"
            style={{ color: "green" }}
          ></i>
          <h5 className="fw-bold menu-actions">View Events</h5>
        </div>
        <div className="mt-5  text-success ">
          <a className="loginstyle" href="/counterlogin">
            <i
              className="icons fa-solid fa-right-to-bracket fa-2xl mx-1 my-4"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold menu-actions">Counter LogIn</h5>
          </a>
        </div>
        <div className="mt-5  text-success">
          <a className="loginstyle" href="/countcoordinatorlogin">
            <i
              className="icons fa-solid fa-right-to-bracket fa-2xl mx-1 my-4"
              style={{ color: "green" }}
            ></i>
            <h5 className="fw-bold menu-actions">Count-Coodinator</h5>
          </a>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
