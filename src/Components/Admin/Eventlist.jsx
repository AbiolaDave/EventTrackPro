import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSender } from "../redux/newEvent";
import "./eventList.css"

const Eventlist = (props) => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();

  const sender = useSelector((state) => state.newEvent.sender);

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

  useEffect(() => {
    let countertoken = localStorage.Countertoken;
    if (countertoken) {
      if (!sender.length) {
        dispatch(setSender(props.user));
      }
    } else {
      console.log("err");
    }
  }, [dispatch, props.user, sender]);

  return (
    <div className="showEvent">
      <div className="coc">
        <div className="text-center text-light bg-success p-1 fw-bold">
          <h3 className="fw-bold">All Events</h3>
        </div>
        <div className="text-success">
          {events.length > 0 ? (
            events.map((eachEvent, index) => (
              <>
                <div className="coco">
                  <ul
                    className="text-success mb-5"
                    key={eachEvent.eventId}
                  >
                    <li>
                      <Link
                        className="listing"
                        onClick={() => dispatch(setSender(props.user))}
                        to={`/adminpage/${eachEvent.eventId}`}
                        key={eachEvent.eventId}
                      >
                        <table className="table">
                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Name</th>
                              <th>Service Index</th>
                              <th>Event ID</th>
                              <th>Admin</th>
                              <th>Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            <td>{index + 1}</td>
                            <td>{eachEvent.eventName}</td>
                            <td>{eachEvent.serviceIndex}</td>
                            <td>{eachEvent.eventId}</td>
                            <td>{eachEvent.admin}</td>
                            <td>{eachEvent.setDate}</td>
                          </tbody>
                        </table>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ))
          ) : (
            <div className="coc">
              <p>No events found...</p>
            </div>
          )}
        </div>
      </div>
    </div>
    // <table class="table mt-3">
    //           <thead>
    //             <tr>
    //               <th>S/N</th>
    //               <th>Counter</th>
    //               <th>Service Index</th>
    //               <th>Male</th>
    //               <th>Female</th>
    //               <th>Children</th>
    //               <th>Vehicles</th>
    //               <th>Motor Bikes</th>
    //               <th>Converts</th>
    //               <th>New Timers</th>
    //               <th>Total</th>
    //               <th>Actions</th>
    //             </tr>
    //           </thead>
    //           <tbody id="tableContent">
    //             <tr>
    //               <td>{index}</td>
    //               <td>{each.sender}</td>
    //               <td>{index}</td>
    //               <td>{each.male}</td>
    //               <td>{each.female}</td>
    //               <td>{each.children}</td>
    //               <td>{each.vehicles}</td>
    //               <td>{each.motorbikes}</td>
    //               <td>{}</td>
    //               <td>{each.firsttimers}</td>
    //               <td>
    //                 {" "}
    //                 {Number(each.male) +
    //                   Number(each.female) +
    //                   Number(each.children)}
    //               </td>
    //               <td>
    //                 {acceptedCounts[index] ? (
    //                   <div></div>
    //                 ) : (
    //                   <div>
    //                     <button
    //                       className="btn btn-success "
    //                       onClick={() => acceptCount(index)}
    //                     >
    //                       +
    //                     </button>
    //                     <button
    //                       className="btn btn-danger mx-2"
    //                       onClick={() => rejectCount(index)}
    //                     >
    //                       X
    //                     </button>
    //                   </div>
    //                 )}
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
  );
};

export default Eventlist;
