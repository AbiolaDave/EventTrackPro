import axios from "axios";
import { useFormik } from "formik";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import * as yup from "yup";
import "./createEvents.css";

const CreateEvents = (props) => {
  const [events, setevents] = useState([]);
  const [qrCode, setqrCode] = useState("");
  const [admin, setadmin] = useState("");
  const [Id, setId] = useState("");
  const [uniqueId, setuniqueId] = useState("");
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
  };


  let url = "https://eventtrackpro-backend.onrender.com/admin/adminpage";

  const formik = useFormik({
    initialValues: {
      eventName: "",
      setDate: "",
      serviceIndex: "",
      eventQrCode: "",
    },
    onSubmit: (values) => {
      if (window.confirm("Add New Event?")) {
        let randomNumber = Math.floor(Math.random() * 900) + 100;
        setId(randomNumber);
        let unique = formik.values.eventName + randomNumber;
        setuniqueId(unique);

        let eventObj = {
          ...values,
          qrCode: unique, 
          eventId: randomNumber, 
          uniqueId: unique, 
          admin: props.admin,
        };

        axios.post(url, eventObj).then((response) => {
          if (!response.data.status) {
            console.log(response.data.message);
          } else {
            localStorage.token = response.data.token;
            console.log(response.data.message);
            window.alert("event has been added successfully")
            // navigate("/adminpage");
          }
        });
        formik.resetForm();
      }
    },

    validationSchema: yup.object().shape({
      eventName: yup.string().required("This field is required"),
      setDate: yup.string().required("This field is required"),
      serviceIndex: yup.number().required("Please select a valid optionss"),
    }),
  });
  return (
    <>
      <div className="create">
        <div className="cointainer col-5 col-sm-4 mx-auto p-3 mt-5  ">
          <div className="text-center text-success fw-bold">
            <div>Hello {props.admin}</div>
            <h1 className="fw-bold">Create Event</h1>
          </div>
          <div className="mt-5">
            <form action="" onSubmit={formik.handleSubmit}>
              <label className="text-success fw-bold" htmlFor="">
                Event Name:
              </label>
              <input
                className={
                  formik.touched.eventName && formik.errors.eventName
                    ? "form-control mx-3  text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                type="text"
                placeholder="Name of Event"
                name="eventName"
                onChange={formik.handleChange}
                value={formik.values.eventName}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.eventName && formik.errors.eventName}
              </div>
              <div className="mt-3 text-center">
                <label className="text-success fw-bold" htmlFor="">
                  Set Date:
                </label>
                <input
                  className={
                    formik.touched.setDate && formik.errors.setDate
                      ? "form-control mx-3  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  type="date"
                  placeholder=""
                  name="setDate"
                  onChange={formik.handleChange}
                  value={formik.values.setDate}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.setDate && formik.errors.setDate}
                </div>
              </div>
              <div className="mt-3 text-center">
                <label className="text-success fw-bold" htmlFor="">
                  No of Service Index:
                </label>
                <input
                  className={
                    formik.touched.serviceIndex && formik.errors.serviceIndex
                      ? "form-control mx-3  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  type="text"
                  placeholder="Add number of service index"
                  name="serviceIndex"
                  onChange={formik.handleChange}
                  value={formik.values.serviceIndex}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.serviceIndex && formik.errors.serviceIndex}
                </div>
              </div>
              <div className="p-5 text-center">
                <button
                  type="submit"
                  className="btn btn-success p-1 form-control mt-3 "
                >
                  Add Event
                </button>
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvents;
