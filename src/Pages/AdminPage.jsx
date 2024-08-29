import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCounter from "../Components/Admin/AddCounter";
import AdminBody from "../Components/Admin/AdminBody";
import AdminMenu from "../Components/Admin/AdminMenu";
import CreateEvents from "../Components/Admin/CreateEvents";
import Eventlist from "../Components/Admin/Eventlist";
import FooterComp from "../Components/FooterComp";
import MainNavbar from "../Components/MainNavbar";
import { resetPage } from "../Components/redux/newEvent";
import "./adminPage.css"


const AdminPage = () => {
  const dispatch = useDispatch();
  const createNewEvent = useSelector((state) => state);
  console.log(createNewEvent.newEvent.createEvent, "admin page");

  let Admintoken = localStorage.Admintoken;
  let navigate = useNavigate();
  let url = "https://eventtrackpro-backend.onrender.com/admin/adminpage";

  const [user, setuser] = useState("");
  const [admin, setadmin] = useState("");
  const [AdminqrCode, setAdminqrCode] = useState("");

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${Admintoken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((response) => {
        if (!response.data.status) {
          console.log(response.data.status, "here error");
          navigate("/login");
        } else {
          setuser(response.data.firstname);
          setadmin(response.data.admin);
          setAdminqrCode(response.data.AdminqrCode);
          console.log(response.data.firstname);
          dispatch(resetPage());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, []);
  let componentToDisplay;

  if (createNewEvent.newEvent.createEvent === "empty") {
    componentToDisplay = <AdminBody user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "newevent") {
    componentToDisplay = <CreateEvents user={user} admin={admin} />;
  } else if (createNewEvent.newEvent.createEvent === "viewevent") {
    componentToDisplay = (
      <Eventlist user={user} admin={admin} AdminqrCode={AdminqrCode} />
    );
  } else if (createNewEvent.newEvent.createEvent === "addcount") {
    componentToDisplay = <AddCounter user={user} admin={admin} />;
  } else {
    componentToDisplay = <AdminBody />;
  }

  return (
    <>
      <MainNavbar />
      <div className="d-flex">
        <AdminMenu />
        {componentToDisplay}
      </div>
      <div className="">
        <FooterComp />
      </div>
    </>
  );
};

export default AdminPage;
