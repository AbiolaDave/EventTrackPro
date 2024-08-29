import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddRow from "../Components/Admin/AddRow";
import AddCountCoordinator from "../Components/CountCoordinator/AddCountCoordinator";
import CountCoordinatorBody from "../Components/CountCoordinator/CountCoordinatorBody";
import CountCoordinatorEvents from "../Components/CountCoordinator/CountCoordinatorEvents";
import CountCoordinatorMenu from "../Components/CountCoordinator/CountCoordinatorMenu";
import FooterComp from "../Components/FooterComp";
import MainNavbar from "../Components/MainNavbar";
import "./adminPage.css";

const CountCordinator = () => {
  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent, "admin page");

  let token = localStorage.CounterCoordinatortoken;
  let navigate = useNavigate();
  let url = "https://eventtrackpro-backend.onrender.com/countcoordinator/countcoordinatorpage";

  const [user, setuser] = useState("");
  const [admin, setadmin] = useState("");
  const [userName, setuserName] = useState("");
  const [AdminqrCode, setAdminqrCode] = useState("");
  const [notification, setnotification] = useState([]);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (!response.data.status) {
          console.log(response.data.status, "here error");
          navigate("/eventtrackpro/countcoordinatorlogin");
        } else {
          setuser(response.data.firstname);
          setadmin(response.data.admin);
          setAdminqrCode(response.data.AdminqrCode);
          setuserName(response.data.userName);
          console.log(userName);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/eventtrackpro/countcoordinatorlogin");
      });
  }, []);

  useEffect(() => {
    let url = "https://eventtrackpro-backend.onrender.com/countcoordinator/notification";
    let Coordinator = userName;
    console.log(Coordinator, userName, user, "coordi");
    try {
      axios.post(url, { Coordinator }).then((response) => {
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          setnotification(response.data.notification);
          console.log(
            response.data.message,
            response.data.notification,
            "message"
          );
        }
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }

    if (user) {
      getRejected();
    }
  }, [userName]);

  const getRejected = async () => {
    let url = "https://eventtrackpro-backend.onrender.com/countcoordinator/rejected";
    let counter = userName;
    console.log(counter, "jjjj");
    try {
      axios.post(url, { counter }).then((response) => {
        if (response.data.status) {
          console.log(response.data);
          window.confirm("count rejected");
        } else {
          console.log(response.data);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  let componentToDisplay;

  if (createNewEvent.newEvent.createEvent === "empty") {
    componentToDisplay = <CountCoordinatorBody user={user} />;
  } else if (createNewEvent.newEvent.createEvent === "newevent") {
    componentToDisplay = (
      <AddCountCoordinator user={user} admin={admin} userName={userName} />
    );
  } else if (createNewEvent.newEvent.createEvent === "viewevent") {
    componentToDisplay = (
      <CountCoordinatorEvents
        user={user}
        admin={admin}
        AdminqrCode={AdminqrCode}
      />
    );
  } else if (createNewEvent.newEvent.createEvent === "addcount") {
    componentToDisplay = <AddRow user={user} />;
  } else {
    componentToDisplay = <div></div>;
  }

  return (
    <>
      <MainNavbar notification={notification} />
      <div className="d-flex">
        <CountCoordinatorMenu />
        {componentToDisplay}
      </div>
      <div className="">
        <FooterComp />
      </div>
    </>
  );
};

export default CountCordinator;
