import React from "react";
import dashboardImg from "../multimedia/Home.png";

const style = {
  width: "900px",
  height: "850px",
  marginLeft: "-70px",
  objectFit: "fill",
};

const DashboardImage = () => {
  return (
    <>
      <div className="container-fluid">
        <img
          className="container-fluid"
          style={style}
          src={dashboardImg}
          alt=""
        />
      </div>
    </>
  );
};

export default DashboardImage;
