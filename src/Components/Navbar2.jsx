import { library } from "@fortawesome/fontawesome-svg-core";
import { faBell, faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import countlogo from "../multimedia/attendance-logo1.jpeg";
library.add(faCoffee);

const style = {
  backgroundColor: "green",
};

const Navbar2 = (props) => {
  const [numb, setnumb] = useState(0);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    console.log(props, "from navbar");
    if (props.notification && props.notification.length > 0) {
      setnumb(props.notification.length);
      setvisible(true);
    }
  }, [props.notification]);

  let navigate = useNavigate();
  const login = () => {
    navigate("/eventtrackpro/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={style}>
        <div className="container-fluid">
          <a
            className="navbar-brand d-flex align-items-center"
            href="/eventtrackpro/"
          >
            <img className="mx-2" height="50px" src={countlogo} alt="" />
            <h3 className="text-white fw-bold fs-2">EventTrackPro</h3>
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
          <div className="ollapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/eventtrackpro/"
                >
                  Home
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/eventtrackpro/adminlogin"
                >
                  Admin
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/eventtrackpro/counterregister"
                >
                  Counter
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/eventtrackpro/countcoordinatorlogin"
                >
                  Coordinator
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/eventtrackpro/"
                >
                  Profile
                </a>
              </li>
              <li className="nav-item mx-3">
                <a
                  className="nav-link text-light fw-bold fs-5"
                  aria-current="page"
                  href="/eventtrackpro/"
                >
                  Contact Us
                </a>
              </li>

              {visible && (
                <li className="nav-item mx-3">
                  <div className="d-flex">
                    <FontAwesomeIcon
                      icon={faBell}
                      size="2xl"
                      style={{ color: "#ffffff" }}
                    />
                    <div className="num fw-bold">
                      <p>{numb}</p>
                    </div>
                  </div>
                </li>
              )}
              <li className="nav-item">
                <div className="d-flex mx-2" role="search">
                  <a
                    href="/eventtrackpro/login"
                    className="btn-lg btn mx- btn-outline-light"
                    onClick={login}
                  >
                    Log Out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
