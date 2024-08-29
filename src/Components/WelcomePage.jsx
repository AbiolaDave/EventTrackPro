import React from "react";
import "./welcomePage.css";

const WelcomePage = () => {
  return (
    <>
      <main className="min-vh-100 hero d-flex justify-content-center align-items-center">
        <div className="mt-5 container welcome">
          <h1 className="text-white display-2 fw-bold mt-5 text-shadow-sm">
            <span className="text-success ">Welcome to EventTrackPro</span>
            <span className="">
              <h4 className="display-6 fw-bold text-shadow-sm">
                - Your Modern Solution for Event Head Count Management!
                EventTrackPro is a cutting-edge application designed to
                streamline the process of tracking head counts at events,
                eliminating the need for manual record-keeping. With our
                innovative QR-code technology, users can effortlessly add
                counters to events, record attendance, and submit data with
                ease.
              </h4>
            </span>
            <blockquote className="blockquote text-light fs-1"></blockquote>
          </h1>
        </div>
      </main>
    </>
  );
};

export default WelcomePage;
