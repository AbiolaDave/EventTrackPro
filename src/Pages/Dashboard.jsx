import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyHome from "../Components/BodyHome";
import FooterHome from "../Components/FooterHome";
import MainHome from "../Components/MainHome";
import Navbar2 from "../Components/Navbar2";
import SectionHome from "../Components/SectionHome";
import "./dashboard.css";

const Dashboard = () => {
  let token = localStorage.token;
  let navigate = useNavigate();
  let url = "https://eventtrackpro-backend.onrender.com/user/dashboard";

  const [user, setuser] = useState("");

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
          navigate("/login");
        } else {
          setuser(response.data.firstname);
          console.log(response.data.firstname);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, []);

  return (
    <>
      <Navbar2 />
      <MainHome user={user} />
      <SectionHome />
      <BodyHome />
      <FooterHome />
    </>
  );
};

export default Dashboard;
