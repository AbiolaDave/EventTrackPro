import axios from "axios";
import { useFormik } from "formik";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { startCount } from "../redux/newEvent";
import "./eventCounter.css";

const EventsCounter = (props) => {
  const sender = useSelector((state) => state.newEvent.sender);
  console.log(sender);
  const dispatch = useDispatch();
  const [create, setcreate] = useState(false);

  const [event, setEvent] = useState(null);
  const [eventCounter, setEventCounter] = useState([]);
  const [startButton, setstartButton] = useState(false);
  const [rowCount, setrowCount] = useState("");
  const [addCounter, setaddCounter] = useState(false);
  const [scanQrCode, setscanQrCode] = useState(false);
  const [user, setUser] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://eventtrackpro-backend.onrender.com/counter/counterpage/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleDownloadPdf = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  useEffect(() => {
    checkEventDate();
  }, [event]);

  const formik = useFormik({
    initialValues: {
      male: "",
      female: "",
      children: "",
      vehicles: "",
      motorbikes: "",
      firsttimers: "",
      teenagers: "",
    },
    onSubmit: async (values) => {
      if (window.confirm("Are you sure you want to submit count?")) {
        let url = "https://eventtrackpro-backend.onrender.com/counter/count";
        console.log(values, "Form Values");
        let {
          male,
          female,
          children,
          vehicles,
          motorbikes,
          firsttimers,
          teenagers,
        } = values;
        let admin = event.admin;
        let uniqueId = event.uniqueId;
        await axios
          .post(url, {
            male,
            female,
            children,
            vehicles,
            motorbikes,
            firsttimers,
            teenagers,
            sender,
            admin,
            uniqueId,
          })
          .then((response) => {
            console.log(response);
            if (response.data.status) {
              console.log(
                "hello",
                response.data.status,
                response.data.Admintoken
              );
              formik.resetForm();
            } else {
              console.log(response.data.message);
            }
          })
          .catch((error) => {
            console.error("There was an error!", error);
          });
      }
    },
    validationSchema: yup.object({
      male: yup.number().required("This field is required"),
      female: yup.number().required("This field is required"),
      children: yup.number().required("This field is required"),
      vehicles: yup.number().required("This field is required"),
      motorbikes: yup.number().required("This field is required"),
      firsttimers: yup.number().required("This field is required"),
      teenagers: yup.number().required("This field is required"),
    }),
  });

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
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
        console.log(event.counter, eventCounter);
        console.log("The event date is today!");
      } else {
        console.log("The event date is not today.");
        setstartButton(true);
        setrowCount(event.addRow);
        setEventCounter(event.counter);
        console.log(event.counter, eventCounter);
        console.log("The event date is today!");
      }
    }
  };

  const startEvent = async () => {
    if (window.confirm("Start event?")) {
      setaddCounter(true);
      dispatch(startCount());
      console.log(rowCount);
    }
  };

  return (
    <div className="showEvent">
      <div className="text-center text-light bg-success p-1 fw-bold">
        <h3 className="mt-2">EVENT</h3>
      </div>
      <div className="coc text-center">
        {event ? (
          <div className="text-center mt-5 mb-5 coc-eve">
            <h2>{event.eventName}</h2>
            <p>Date: {event.setDate}</p>
            <p>Rows: {event.addRow}</p>
            <p>Event ID: {event.eventId}</p>
            <p>Unique ID: {event.uniqueId}</p>
            <p>Count Coordinator: {event.countCoordinator}</p>
            <p>Counter: {event.counter}</p>
            <p>User: {sender}</p>

            {scanQrCode ? (
              <>
                <div className="mt-3 mb-3" ref={qrRef}>
                  <QRCode
                    size={456}
                    style={{ height: "350px", maxWidth: "350px", width: "50%" }}
                    value={event.uniqueId}
                    id="qrCanvas"
                    viewBox={`0 0 256 256`}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-success form-control mt-3 col-3"
                    onClick={downloadQRCode}
                  >
                    Download QR Code
                  </button>
                </div>
              </>
            ) : null}

            {addCounter ? (
              <div className="mt-3 mb-3 ">
                {eventCounter.map((each, index) => (
                  <div key={index}>
                    <p>counter: {each}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {addCounter ? (
              <div className="mt-3 col-3 col-sm-5 container mx-auto p-2 rounded-2 mb-3 count-form">
                <h1 className="text-center text-success">Event Count</h1>
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="male" className="text-success fw-bold">
                    Male:
                  </label>
                  <input
                    type="male"
                    className={
                      formik.touched.male && formik.errors.male
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="Male"
                    name="male"
                    onChange={formik.handleChange}
                    value={formik.values.male}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.male && formik.errors.male}
                  </div>
                  <label htmlFor="female" className="text-success fw-bold">
                    Female:
                  </label>
                  <input
                    type="female"
                    className={
                      formik.touched.female && formik.errors.female
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="Female"
                    name="female"
                    onChange={formik.handleChange}
                    value={formik.values.female}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.female && formik.errors.female}
                  </div>
                  <label htmlFor="children" className="text-success fw-bold">
                    Children:
                  </label>
                  <input
                    type="children"
                    className={
                      formik.touched.children && formik.errors.children
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="Children"
                    name="children"
                    onChange={formik.handleChange}
                    value={formik.values.children}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.children && formik.errors.children}
                  </div>
                  <label htmlFor="teenagers" className="text-success fw-bold">
                    Teenagers:
                  </label>
                  <input
                    type="teenagers"
                    className={
                      formik.touched.teenagers && formik.errors.teenagers
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="Teenagers"
                    name="teenagers"
                    onChange={formik.handleChange}
                    value={formik.values.teenagers}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.teenagers && formik.errors.teenagers}
                  </div>
                  <label htmlFor="vehicles" className="text-success fw-bold">
                    Vehicles:
                  </label>
                  <input
                    type="vehicles"
                    className={
                      formik.touched.vehicles && formik.errors.vehicles
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="Vehicles"
                    name="vehicles"
                    onChange={formik.handleChange}
                    value={formik.values.vehicles}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.vehicles && formik.errors.vehicles}
                  </div>
                  <label htmlFor="motorbikes" className="text-success fw-bold">
                    Motor-bikes:
                  </label>
                  <input
                    type="motorbikes"
                    className={
                      formik.touched.motorbikes && formik.errors.motorbikes
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="Motor-bikes"
                    name="motorbikes"
                    onChange={formik.handleChange}
                    value={formik.values.motorbikes}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.motorbikes && formik.errors.motorbikes}
                  </div>
                  <label htmlFor="firsttimers" className="text-success fw-bold">
                    First Timers:
                  </label>
                  <input
                    type="firsttimers"
                    className={
                      formik.touched.firsttimers && formik.errors.firsttimers
                        ? "form-control my-2 text-success is-invalid"
                        : "bdl form-control my-2 text-success"
                    }
                    placeholder="First Timers"
                    name="firsttimers"
                    onChange={formik.handleChange}
                    value={formik.values.firsttimers}
                    onBlur={formik.handleBlur}
                  />
                  <div className="text-danger">
                    {formik.touched.firsttimers && formik.errors.firsttimers}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success form-control mt-3 mb-5"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : null}

            {startButton ? (
              <button className="btn btn-success" onClick={startEvent}>
                Start Event
              </button>
            ) : null}
          </div>
        ) : (
          <div>Loading event details...</div>
        )}
      </div>
    </div>
  );
};

export default EventsCounter;
