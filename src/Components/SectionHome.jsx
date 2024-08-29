import React from "react";
import img6 from "../multimedia/event-image.jpg";
import img9 from "../multimedia/event3.webp";
import img10 from "../multimedia/event33.jpg";
import img17 from "../multimedia/pexels-ketut-subiyanto-4350099.avif";
import img8 from "../multimedia/start-event-planning-service.jpg";
import img29 from "../multimedia/ushers.jpg";

const SectionHome = () => {
  return (
    <>
      <section className="era">
        <div className="grid">
          <div className="grid0 grid1">
            <img src={img6} alt="" />
            <h2>Create Event</h2>
            <p>
              Create an upcoming event to keep records of attendance to monitor
              growth of event
            </p>
            <h5>Get Started</h5>
          </div>
          <div className="grid0 grid2">
            <img src={img29} alt="" />
            <h2>Take Count</h2>
            <p>
              Sign in as a counter easily by scanning admin QR-code to take
              count of event attendance
            </p>
            <h5>Get Started</h5>
          </div>
          <div className="grid0 grid3">
            <img src={img8} alt="" />
            <h2>My Events</h2>
            <p>
              See all your created events and records. Update and delete event
              or event records
            </p>
            <h5>Get Started</h5>
          </div>
          <div className="grid0 grid4">
            <img src={img10} alt="" />
            <h2>My Page</h2>
            <p>
              See your page info, update name, profile picture and other
              personal details
            </p>
            <h5>Sign Up</h5>
          </div>
          <div className="grid0 grid5">
            <img src={img9} alt="" />
            <h2>Blog</h2>
            <p>
              See what's trending now, on-going events, events news and availabe
              events centers
            </p>
            <h5>Sign up</h5>
          </div>
          <div className="grid0 grid6">
            <img src={img17} alt="" />
            <h2>About Us</h2>
            <p>
              Learn more about the app, speak to a customer care representative,
              meet our creative team
            </p>
            <h5>Sign Up</h5>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionHome;
