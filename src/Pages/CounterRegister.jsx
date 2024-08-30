import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import countlogo from "../multimedia/attendance-logo1.jpeg";

const CounterRegister = () => {
  let url =
    "https://eventtrackpro-backend.onrender.com/counter/counterregister";
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      userName: "",
    },
    onSubmit: async (values) => {
      console.log(values, "Form Values");
      await axios
        .post(url, values)
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            console.log("hello", response.data.status);
            navigate("/eventtrackpro/counterpage");
          } else {
            // navigate("/counterpage");
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
    validationSchema: yup.object({
      userName: yup.string().required("This field is required"),
      email: yup
        .string()
        .required("This field is required")
        .email("Please enter a valid email"),
      password: yup.string().required("This field is required"),
    }),
  });

  return (
    <main className="min-vh-150 backg d-flex justify-content-center align-items-center">
      <div className="container mt-5">
        <div className="row">
          <div className="reg col-3 col-sm-5 mx-auto p-3 rounded-2 mt-5 mb-5 con-box">
            <div className="text-center mt-5">
              <img className="" height="50px" src={countlogo} alt="" />
            </div>
            <h4 className="text-center fw-bold text-success">
              Counter Register
            </h4>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="userName" className="text-success fw-bold">
                Username:
              </label>
              <input
                type="text"
                className={
                  formik.touched.userName && formik.errors.userName
                    ? "form-control my-2 text-success is-invalid"
                    : "bdl form-control my-2 text-success"
                }
                placeholder="Username"
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
              />
              <div className="text-danger">
                {formik.touched.userName && formik.errors.userName}
              </div>
              <label htmlFor="email" className="text-success fw-bold">
                Email:
              </label>
              <input
                type="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? "form-control my-2 text-success is-invalid"
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
              <label htmlFor="password" className="text-success fw-bold">
                Password:
              </label>
              <input
                type="password"
                className={
                  formik.touched.password && formik.errors.password
                    ? "form-control my-2 text-success is-invalid"
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
              <button
                type="submit"
                className="btn btn-success form-control mt-3 mb-2"
              >
                Submit
              </button>
              <div className="text-center text-success fw-bold">
                <a className="text-success" href="/eventtrackpro/counterlogin">
                  <p>Login as Counter</p>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CounterRegister;
