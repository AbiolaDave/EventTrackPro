import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/welcomePage.css";
import countlogo from "../multimedia/attendance-logo1.jpeg";

const style = {
  backgroundColor: "green",
};

const Navbar = () => {
  let navigate = useNavigate();
  const register = () => {
    navigate("/eventtrackpro/register");
  };
  const login = () => {
    navigate("/eventtrackpro/selectlogin");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={style}>
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex align-items-center"
            href="/eventtrackpro/"
          >
            <img
              className="mx-5 countlogo"
              height="50px"
              src={countlogo}
              alt=""
            />
            <h3 className="text-white fw-bold fs-1 brand-name">
              EventTrackPro
            </h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-4"
                  aria-current="page"
                  href="/eventtrackpro/"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-4"
                  aria-current="page"
                  href="/eventtrackpro/"
                >
                  How To Register
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-4"
                  aria-current="page"
                  href="/eventtrackpro/"
                >
                  Our Team
                </a>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <a
                href="#login"
                className="btn-lg btn mx-3 btn-outline-light"
                onClick={login}
              >
                Log in
              </a>
              <a
                href="/eventtrackpro/register"
                className="btn-lg btn mx-3 btn-light"
                onClick={register}
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
