import React from "react";
import firstImage from "../multimedia/video-for-event-marketing.jpg";

const MainHome = (props) => {

  

  return (
    <>
      <main>
        <div className="">
          <div className="cover">
            <svg class="wave" viewBox="50 0 500 200">
              <path
                d="M 0 50 C 150 150 300 0 500 80 L 500 0 L 0 0"
                fill="limegreen"
              ></path>
              <path
                d="M 0 50 C 150 150 330 -30 500 50 L 500 0 L 0 0"
                fill="lime"
                opacity="0.8"
              ></path>
              <path
                d="M 0 50 C 215 150 250 0 500 100 L 500 0 L 0 0"
                fill="limegreen"
                opacity="0.5"
              ></path>
            </svg>
          </div>
          <div className="dashhead d-flex">
            <div className="mx-5 text-white mt-2">
              <h3 className="fw-bold">Welcome, {props.user}</h3>
            </div>
            <div className="txt text-light">
              <h1 className="fw-bold">
                Effortless Event Head Count Management
              </h1>
              <p className="fw-bold">
                EventTrackPro simplifies the way you manage event head counts.
              </p>
            </div>
            <img className="firstImg" src={firstImage} alt="" />
          </div>
        </div>
      </main>
    </>
  );
};

export default MainHome;
