import axios from "axios";
import { useFormik } from "formik";
import html2canvas from "html2canvas";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import countlogo from "../multimedia/attendance-logo1.jpeg";

const Register = () => {
  let url = "https://eventtrackpro-backend.onrender.com/user/register";
  const [registeredUsers, setregisteredUsers] = useState([]);
  const [userqrcode, setuserqrcode] = useState("");
  const qrRef = useRef(null);

  const downloadQRCode = () => {
    html2canvas(qrRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "qrcode.png";
      link.click();
    });
  };

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      userName: "",
      gender: "Male",
      userqrcode: "",
    },
    onSubmit: async (values) => {
      const userqrcode = formik.values.userName; 
      await axios
        .post(url, {
          ...values,
          userqrcode: userqrcode, 
        })
        .then((response) => {
          console.log(response);
          if (response.data.staus) {
            console.log("hello", response.data.status);
            navigate("/login");
          } else {
            console.log(response.data.message);
          }
        });
    },
    validationSchema: yup.object({
      firstname: yup.string().required("This field is required"),
      lastname: yup.string().required("This field is required"),
      email: yup
        .string()
        .required("This field is required")
        .email("Please enter a valid"),
      password: yup.string().required("This field is required"),
      gender: yup
        .string()
        .required("This field is required")
        .oneOf(["male", "female"], "Please select a valid option"),
    }),
  });

  return (
    <>
      <main className="min-vh-150 backg d-flex justify-content-center align-items-center">
        <div className="container mt-5">
          <div className="row">
            <div className="reg col-3 col-sm-5 mx-auto p-3 rounded-2  mt-5 mb-5 con-box">
              <div className="text-center mt-5">
                <img className="" height="50px" src={countlogo} alt="" />
              </div>

              <h1 className="text-center text-success">Sign Up</h1>
              <form action="" onSubmit={formik.handleSubmit}>
                <label htmlFor="" className="text-success fw-bold">
                  First Name:
                </label>
                <input
                  type="text"
                  className={
                    formik.touched.firstname && formik.errors.firstname
                      ? "form-control my-2  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  placeholder="First Name"
                  name="firstname"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <label htmlFor="" className="text-success fw-bold">
                  Last Name:
                </label>
                <input
                  type="text"
                  className={
                    formik.touched.lastname && formik.errors.lastname
                      ? "form-control my-2  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  placeholder="Lastname"
                  name="lastname"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <label htmlFor="" className="text-success fw-bold">
                  Username:
                </label>
                <input
                  type="text"
                  className={
                    formik.touched.userName && formik.errors.userName
                      ? "form-control my-2  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  placeholder="First Name"
                  name="userName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.userName && formik.errors.userName}
                </div>
                <label htmlFor="" className="text-success fw-bold">
                  Email:
                </label>
                <input
                  type="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control my-2  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  placeholder="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.email && formik.errors.email}
                </div>
                <label htmlFor="" className="text-success fw-bold">
                  Password :
                </label>
                <input
                  type="password"
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control my-2  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <div className="text-danger">
                  {formik.touched.password && formik.errors.password}
                </div>
                <label htmlFor="" className="text-success fw-bold">
                  Gender:
                </label>
                <label htmlFor="" className="text-success mx-3">
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="text-success mx-2"
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
                <label htmlFor="" className="text-success mt-3 mb-3 mx-3">
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="text-success mx-2"
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </label>
                <div className="text-danger">
                  {formik.touched.gender && formik.errors.gender}
                </div>
                <div className="text-success fw-bold d-flex">
                  QR-Code:
                  <div className="mt-3" ref={qrRef}>
                    <QRCode
                      size={456}
                      style={{ height: "auto", maxWidth: "100%", width: "50%" }}
                      value={formik.values.userName}
                      id="qrCanvas"
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
                <button
                  className="btn btn-success form-control mt-3 col-3"
                  onClick={downloadQRCode}
                >
                  Download QR Code
                </button>
                <button
                  type="submit"
                  className="btn btn-success form-control mt-3 mb-5"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Register;
