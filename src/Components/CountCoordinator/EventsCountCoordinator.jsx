import axios from "axios";
import { useFormik } from "formik";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { startCount } from "../../Components/redux/newEvent";
import "./eventCountCoordinator.css";
// import "../Admin/eventList.css"

const EventsCountCoordinator = (admin) => {
  let totalMale;
  let totalFemale;
  let totalBikes;
  let totalChildren;
  let totalFirstTimers;
  let totalVehicles;
  let uniqueId;
  let coordinator;

  const sender = useSelector((state) => state.newEvent.sender);
  console.log(sender);
  const dispatch = useDispatch();

  const [event, setEvent] = useState(null);
  const [assignServiceIndex, setAssignServiceIndex] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [eventCounter, setEventCounter] = useState([]);
  const [startButton, setstartButton] = useState(false);
  const [count, setcount] = useState([]);
  const [rowCount, setrowCount] = useState("");
  const [Admin, setAdmin] = useState("");
  const [accept, setaccept] = useState([]);
  const [acceptedCounts, setAcceptedCounts] = useState([]);
  const [rejectedCounts, setRejectedCounts] = useState([]);
  const [decline, setDecline] = useState(false);
  const [user, setUser] = useState("");
  const [serviceIndexes, setServiceIndexes] = useState([]);
  const [counters, setCounters] = useState([]);
  const [acceptCountIndex, setAcceptCountIndex] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://eventtrackpro-backend.onrender.com/countcoordinator/countcoordinator/${eventId}`
        );
        setEvent(response.data);
        setaccept(new Array(response.data.count.length).fill(false));
        setServiceIndexes([...Array(response.data.serviceIndex).keys()]);
        setCounters(response.data.event);
        console.log(counters, "got it? Answer meeeeee");
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId, rejectedCounts]);

  useEffect(() => {
    checkEventDate();
    viewCount();
    handleServiceIndexChange();
    assignCounter();
  }, [event]);

  const assignCounter = (event) => {
    console.log(counters, "huuuuuulk");
  };

  const handleDownloadPdf = () => {
    const input = document.getElementById("pdf-content");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    html2canvas(input, {
      scale: 2,
      useCORS: true, 
      logging: true,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  const sendNotification = async () => {
    let url =
      "https://eventtrackpro-backend.onrender.com/countcoordinator/countnotification";
    let counter = await eventCounter;
    let admin = await Admin;
    try {
      await axios.post(url, { counter, admin }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          console.log(response.data.message, "message");
        }
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const viewCount = async () => {
    let url =
      "https://eventtrackpro-backend.onrender.com/countcoordinator/count";
    let admin = await event.admin;
    let uniqueId = await event.uniqueId;
    axios
      .post(url, {
        admin,
        uniqueId,
      })
      .then((response) => {
        console.log(response);
        if (response.data.status) {
          setcount(response.data.count);
          setaccept(new Array(response.data.count.length).fill(false));
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    console.log(acceptedCounts, rejectedCounts, "useEffect accepted count");
  }, [acceptedCounts]);

  useEffect(() => {
    let url =
      "https://eventtrackpro-backend.onrender.com/countcoordinator/rejectcount";
    if (rejectedCounts.length > 0) {
      let rejectedId = rejectedCounts[0].uniqueId;
      let rejectedSender = rejectedCounts[0].sender;
      let rejected = rejectedCounts[0];
      let counter = event.counter;
      console.log(counter, "all here");
      axios
        .post(url, {
          rejectedId,
          rejectedSender,
          rejected,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            console.log(response.data, "something here");
          } else {
            console.log(response.data.message, "nothing here");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      console.log("error");
    }
  }, [decline]);

  const acceptCount = async (index) => {
    if (window.confirm("Accept Count?")) {
      const newAccept = [...accept];
      newAccept[index] = true;
      await setaccept(newAccept);
      await setAcceptedCounts([...acceptedCounts, count[index]]);
      setAcceptCountIndex(true);
    }
  };

  const rejectCount = (index) => {
    if (window.confirm("Are you sure you want to reject this count?")) {
      const newAccept = [...accept];
      newAccept[index] = false;
      setaccept(newAccept);
      setRejectedCounts([...rejectedCounts, count[index]]);
      setDecline(true);
      viewCount();
      window.alert("count rejected");
      navigate(`/eventtrackpro/countcoordinator/${eventId}`);
    }
  };

  const checkEventDate = async () => {
    if (event) {
      let date = new Date();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();

      const eventDate = new Date(event.setDate);
      const eventMonth = eventDate.getMonth() + 1;
      const eventDay = eventDate.getDate();
      const eventYear = eventDate.getFullYear();

      if (eventMonth === month && eventDay === day && eventYear === year) {
        setstartButton(true);
        setrowCount(event.addRow);
        setEventCounter(event.counter);
        setAdmin(event.admin);
        console.log(event.counter, eventCounter);
        console.log("The event date is today!");
      } else {
        console.log("The event date is not today.");
      }
    }
  };

  const startEvent = async () => {
    if (window.confirm("Start event?")) {
      setstartButton(false);
      viewCount();
      sendNotification();
      const totalMale = count.reduce((sum, each) => sum + Number(each.male), 0);
      setUser(totalMale);
      console.log("total male: ", totalMale);
      dispatch(startCount());
      console.log(rowCount, "rowww", user);
    }
  };

  const submitCount = async () => {
    let url =
      "https://eventtrackpro-backend.onrender.com/countcoordinator/submit";
    let submittedCount = {
      totalMale,
      totalFemale,
      totalChildren,
      totalVehicles,
      totalBikes,
      totalFirstTimers,
      uniqueId,
      coordinator,
    };
    console.log(submittedCount);
    if (window.confirm("Submit count?")) {
      axios.post(url, { submittedCount }).then((response) => {
        console.log(response);
        if (response.data.status) {
          console.log(response.data, "something here");
        } else {
          console.log(response.data.message, "nothing here");
        }
      });
    }
  };

  const handleServiceIndexChange = () => {
    if (event) {
      const value = event.serviceIndex;
      const numberOfIndexes = parseInt(value, 10);
      if (numberOfIndexes && numberOfIndexes > 0) {
        setServiceIndexes([...Array(numberOfIndexes).keys()]);
        formik.setFieldValue(
          "assignedServiceIndex",
          new Array(numberOfIndexes).fill("")
        );
      } else {
        setServiceIndexes([]);
        formik.setFieldValue("assignedServiceIndex", []);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      assignedServiceIndex: [],
    },
    onSubmit: (values) => {
      let url =
        "https://eventtrackpro-backend.onrender.com/countcoordinator/assigncounter";
      if (window.confirm("Add New Event?")) {
        let eventObj = {
          ...values,
          assignedServiceIndex: [],
        };

        let assignedServiceIndex = values.assignedServiceIndex;

        axios.post(url, { values, event }).then((response) => {
          if (!response.data.status) {
            window.alert("error occured");
            console.log(response.data.message);
          } else {
            console.log(response.data.message);
            window.alert("event updated");
          }
        });
        formik.resetForm();
      }
    },
    validationSchema: yup.object().shape({
      assignedServiceIndex: yup
        .array()
        .of(yup.string().required("Assign a counter to this service index")),
    }),
  });

  const handleAssignCounter = (index, value) => {
    const newAssignServiceIndex = [...assignServiceIndex];
    newAssignServiceIndex[index] = value;
    setAssignServiceIndex(newAssignServiceIndex);
    formik.setFieldValue(`assignedServiceIndex[${index}]`, value);
  };

  return (
    <div className="showEvent">
      <div className="text-center text-light bg-success p-1 fw-bold">
        <h3 className="mt-2">EVENT</h3>
      </div>
      {event ? (
        <div className="text-center mt-5 mb-5">
          <h2>{event.eventName}</h2>
          <p>Date: {event.setDate}</p>
          <p>Rows: {event.addRow}</p>
          <p>Event ID: {event.eventId}</p>
          <p>Unique ID: {(uniqueId = event.uniqueId)}</p>
          <p>Count Coordinator: {(coordinator = event.countCoordinator)}</p>
          <p>Counter: {event.counter + " "}</p>
          <p>Service Index: {event.serviceIndex}</p>
          <p>Assigned Service index: {event.assignedServiceIndex}</p>
          {event.assignedServiceIndex === "" ? (
            <div></div>
          ) : (
            <>
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="mt-3 text-center">
                  <label className="text-success fw-bold" htmlFor=""></label>
                  <input
                    className="form-control mx-3 text-success"
                    type="number"
                    name="serviceIndex"
                    value={event.serviceIndex}
                    hidden
                    onBlur={formik.handleBlur}
                  />
                </div>
                {serviceIndexes.map((_, index) => (
                  <div className="cointainer col-5 col-sm-4 mx-auto mt-3 ">
                    <div className="text-center" key={index}>
                      <label className="text-success fw-bold" htmlFor="">
                        Assign counter to Service Index {index + 1}:
                      </label>
                      <select
                        className="form-control my-2 text-success"
                        name={`assignedServiceIndex[${index}]`}
                        onChange={(e) =>
                          handleAssignCounter(index, e.target.value)
                        }
                        value={assignServiceIndex[index] || ""}
                      >
                        <option value="" label="Select counter" />
                        {event.counter.map((counter, idx) => (
                          <option key={idx} value={counter}>
                            {counter}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
                <button className="btn btn-success mt-3" type="submit">
                  Assign Counters
                </button>
              </form>
            </>
          )}

          <div className="container" id="pdf-content">
            {count.map((each, index) => (
              <>
                <div className="container col-sm-9 mt-3">
                  <div className="bg-success p-2">
                    <h2 className="text-light">Submitted Count</h2>
                  </div>
                  {/* <ul className="text-success mb-5" key={each.eventId}> */}
                  <li className="mt-3">
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>S/N</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{index + 1}</h3>
                      </div>
                    </div>
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>Male</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{each.male}</h3>
                      </div>
                    </div>{" "}
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>Female</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{each.female}</h3>
                      </div>
                    </div>{" "}
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>Children</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{each.children}</h3>
                      </div>
                    </div>{" "}
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>Vehicles</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{each.vehicles}</h3>
                      </div>
                    </div>{" "}
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>Motor Bikes</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{each.motorbikes}</h3>
                      </div>
                    </div>{" "}
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>First Timers</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>{each.firsttimers}</h3>
                      </div>
                    </div>{" "}
                    <div className="d-flex col-sm-9 mt-3 mx-auto">
                      <label htmlFor="">
                        <h3>Total</h3>
                      </label>
                      <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                        <h3>
                          {Number(each.male) +
                            Number(each.female) +
                            Number(each.children)}
                        </h3>
                      </div>
                    </div>{" "}
                    {acceptedCounts[index] ? (
                      <div></div>
                    ) : (
                      <div className="d-flex col-sm-9 mt-3 container">
                        <div className="d-flex mx-auto">
                          <button
                            className="btn btn-success d-flex"
                            onClick={() => acceptCount(index)}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-danger d-flex mx-2"
                            onClick={() => rejectCount(index)}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                  {/* </ul> */}
                </div>
              </>
            ))}

            {
              <div className="col-sm-9 container mt-5">
                <div className="bg-success p-2">
                  <h2 className="text-white fw-bold">Higher Total</h2>
                </div>
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>Male</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>
                      {" "}
                      {
                        (totalMale = acceptedCounts.reduce(
                          (sum, each) => sum + Number(each.male),
                          0
                        ))
                      }{" "}
                    </h3>
                  </div>
                </div>{" "}
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>Female</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>
                      {" "}
                      {
                        (totalFemale = acceptedCounts.reduce(
                          (sum, each) => sum + Number(each.female),
                          0
                        ))
                      }
                    </h3>
                  </div>
                </div>{" "}
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>Children</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>
                      {" "}
                      {
                        (totalChildren = acceptedCounts.reduce(
                          (sum, each) => sum + Number(each.children),
                          0
                        ))
                      }
                    </h3>
                  </div>
                </div>{" "}
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>Vehicles</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>
                      {" "}
                      {
                        (totalVehicles = acceptedCounts.reduce(
                          (sum, each) => sum + Number(each.vehicles),
                          0
                        ))
                      }
                    </h3>
                  </div>
                </div>{" "}
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>Motor Bikes</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>
                      {" "}
                      {
                        (totalBikes = acceptedCounts.reduce(
                          (sum, each) => sum + Number(each.motorbikes),
                          0
                        ))
                      }
                    </h3>
                  </div>
                </div>{" "}
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>First Timers</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>
                      {" "}
                      {
                        (totalFirstTimers = acceptedCounts.reduce(
                          (sum, each) => sum + Number(each.firsttimers),
                          0
                        ))
                      }
                    </h3>
                  </div>
                </div>{" "}
                <div className="d-flex col-sm-9 mt-3 mx-auto">
                  <label htmlFor="">
                    <h3>Total</h3>
                  </label>
                  <div className="bdl mx-5 container col-sm-9 mt-3 mx-auto">
                    <h3>{totalMale + totalFemale + totalChildren}</h3>
                  </div>
                </div>{" "}
                <button
                  className="btn btn-info mt-3"
                  onClick={handleDownloadPdf}
                >
                  Download as PDF
                </button>
                {acceptedCounts.length > 0 &&
                acceptedCounts.length === count.length ? (
                  <button
                    className="btn btn-success mt-3 mx-3"
                    onClick={submitCount}
                  >
                    Submit Count
                  </button>
                ) : null}
                {startButton ? (
                  <button
                    className="btn btn-warning mx-3 mt-3"
                    onClick={startEvent}
                  >
                    Start Event
                  </button>
                ) : null}
              </div>
            }
          </div>
        </div>
      ) : (
        <div>Loading event details...</div>
      )}
    </div>
  );
};

export default EventsCountCoordinator;
