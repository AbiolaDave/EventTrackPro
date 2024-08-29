import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../Pages/login.css";
import countlogo from "../multimedia/attendance-logo1.jpeg";

const style = {
  width: "400px",
  height: "370px",
};
const divStyle = {
  position: "absolute",
  width: "400px",
  height: "20px",
  backgroundColor: "green",
  left: "482px",
  top: "48px",
};
const Login = () => {
  let url = "https://eventtrackpro-backend.onrender.com/user/login";

  const [registeredUsers, setregisteredUsers] = useState([]);
  const [loginUsers, setloginUsers] = useState([]);
  const [errorMessage, seterrorMessage] = useState(false);

  // useEffect(() => {
  //   if (localStorage.allUsers) {
  //     let localallUsers = JSON.parse(localStorage.allUsers);
  //     setregisteredUsers(localallUsers);
  //   } else {
  //     setregisteredUsers([]);
  //   }
  // }, []);

  let navigate = useNavigate();
  // const dispatch = useDispatch();
  // const globalState = useSelector((state) => state.userArray.allUsers);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      let loginObj = formik.values;
      let { email, password } = loginObj;
      axios.post(url, { email, password }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          localStorage.token = response.data.token;
          navigate("/eventtrackpro/dashboard");
        }
      });

      // axios.post(url, { email, password }).then((response) => {
      //   if (!response.data.status) {
      //     console.log(response.data.message);
      //   } else {
      //     localStorage.token = response.data.token;
      //     navigate("/dashboard");
      //   }
      // });
      // setloginUsers(() => {
      //   let recentLoginUsers = [...loginUsers, loginObj];
      //   localStorage.allLoginUsers = JSON.stringify(recentLoginUsers);
      //   console.log(recentLoginUsers);

      //           let currentUser = registeredUsers.find(
      //             (user) =>
      //               user.email === formik.values.email &&
      //               user.password === formik.values.password
      //           );
      //           if (currentUser) {
      //             // User is registered, redirect to admin page
      //             navigate("/dashboard");
      //           } else {
      //             // User is not registered, display an error message or handle as needed
      //             seterrorMessage(true)
      //           }

      //   return recentLoginUsers;
      // });

      // formik.resetForm;
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("This field is required")
        .email("Please enter a valid"),
      password: yup.string().required("This field is required"),
    }),
  });
  return (
    <>
      <main className="min-vh-150 backg d-flex justify-content-center align-items-center">
        <div className="container mt-5">
          <div className="row">
            <div className="reg col-3 col-sm-4 mx-auto p-3 rounded-2 border  mt-5 mb-5 con-box">
              <div className="text-center text-success fw-bold mt-5">
                <div className="text-center mt-5">
                  <img className="" height="50px" src={countlogo} alt="" />
                </div>
                <h4 className="fw-bold"> Login</h4>
              </div>
              <form action="" onSubmit={formik.handleSubmit}>
                <label className="text-success fw-bold" htmlFor="">
                  Email:
                </label>
                <input
                  className={
                    formik.touched.email && formik.errors.email
                      ? "form-control mx-3  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  type="email"
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  name="email"
                />
                <div className="text-danger">
                  {formik.touched.email && formik.errors.email}
                </div>
                <label className="text-success fw-bold mt-3" htmlFor="">
                  Password:
                </label>
                <input
                  className={
                    formik.touched.password && formik.errors.password
                      ? "form-control mx-3  text-success is-invalid"
                      : "bdl form-control my-2 text-success"
                  }
                  type="password"
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  name="password"
                />
                <div className="text-danger">
                  {formik.touched.password && formik.errors.password}
                </div>
                {errorMessage == false ? (
                  <div></div>
                ) : (
                  <div className="text-center mt-3 text-danger">
                    Invalid Email or Password
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-success form-control mt-4 mb-3"
                >
                  Submit
                </button>
              </form>

              <div className="text-center mt-3 mb-3">
                <a
                  className="text-success text-decoration-none"
                  href="/eventtrackpro/"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
