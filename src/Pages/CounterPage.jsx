import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddRow from "../Components/Admin/AddRow";
import CountEvent from "../Components/Counter/CountEvent";
import CounterBody from "../Components/Counter/CounterBody";
import CounterEvent from "../Components/Counter/CounterEvent";
import CounterMenu from "../Components/Counter/CounterMenu";
import FooterComp from "../Components/FooterComp";
import MainNavbar from "../Components/MainNavbar";
import { resetPage } from "../Components/redux/newEvent";
import "./adminPage.css";

const CounterPage = () => {
  const dispatch = useDispatch();
  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent, "admin page");

  let token = localStorage.Countertoken;
  let navigate = useNavigate();
  let url = "https://eventtrackpro-backend.onrender.com/counter/counterpage";

  const [user, setuser] = useState("");
  const [admin, setadmin] = useState("");
  const [userName, setuserName] = useState("");
  const [AdminqrCode, setAdminqrCode] = useState("");
  const [notification, setnotification] = useState([]);
  const [counterNotification, setcounterNotification] = useState([]);

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
          navigate("/counterlogin");
        } else {
          setuser(response.data.firstname);
          setadmin(response.data.admin);
          setAdminqrCode(response.data.AdminqrCode);
          setuserName(response.data.userName);
          console.log(response.data.firstname);
          dispatch(resetPage());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      let url = "https://eventtrackpro-backend.onrender.com/counter/notification";
      let counter = userName;

      console.log(counter, userName, user, "coordi");

      try {
        const response = await axios.post(url, { counter });
        if (!response.data.status) {
          console.log(response.data.message);
        } else {
          if (response.data.notification) {
            setcounterNotification(response.data.notification);
          }
          await setcounterNotification(response.data.notification);
          await console.log(
            response.data.message,
            response.data.notification,
            "message",
            counterNotification
          );
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (userName) {
      fetchNotifications();
    }
    if (user) {
      getRejected();
    }
  }, [userName]);

  const getRejected = async () => {
    let url = "https://eventtrackpro-backend.onrender.com/counter/rejected";
    let counter = user;
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

  useEffect(() => {
    setnotification(counterNotification);
    console.log(notification, "notify me");
  }, [counterNotification]);

  let componentToDisplay;

  if (createNewEvent.newEvent.createEvent === "empty") {
    componentToDisplay = <CounterBody user={user} />;
  } else if (createNewEvent.newEvent.createEvent === "newevent") {
    componentToDisplay = (
      <CountEvent user={user} admin={admin} userName={userName} />
    );
  } else if (createNewEvent.newEvent.createEvent === "viewevent") {
    componentToDisplay = (
      <CounterEvent user={user} admin={admin} AdminqrCode={AdminqrCode} />
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
        <CounterMenu />
        {componentToDisplay}
      </div>
      <div className="">
        <FooterComp />
      </div>
    </>
  );
};

export default CounterPage;
