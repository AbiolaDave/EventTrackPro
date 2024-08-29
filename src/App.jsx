import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCounter from "./Components/Admin/AddCounter";
import AddRow from "./Components/Admin/AddRow";
import AdminBody from "./Components/Admin/AdminBody";
import AdminMenu from "./Components/Admin/AdminMenu";
import CreateEvents from "./Components/Admin/CreateEvents";
import Eventlist from "./Components/Admin/Eventlist";
import EventsCountCoordinator from "./Components/CountCoordinator/EventsCountCoordinator";
import EventsCounter from "./Components/Counter/EventsCounter";
import Trial from "./Components/Trial";
import AdminLogin from "./Pages/AdminLogin";
import AdminPage from "./Pages/AdminPage";
import AdminRegister from "./Pages/AdminRegister";
import CountCordinator from "./Pages/CountCoordinator";
import CountCoordinatorLogin from "./Pages/CountCoordinatorLogin";
import CountCoordinatorRegister from "./Pages/CountCoordinatorRegister";
import CounterLogin from "./Pages/CounterLogin";
import CounterPage from "./Pages/CounterPage";
import CounterRegister from "./Pages/CounterRegister";
import Dashboard from "./Pages/Dashboard";
import Events from "./Pages/Events";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NewEvent from "./Pages/NewEvent";
import Register from "./Pages/Register";
import SelectLogin from "./Pages/SelectLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/eventtrackpro/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/adminregister" element={<AdminRegister />} />
        <Route path="/createevents" element={<CreateEvents />} />
        <Route path="/trial" element={<Trial />} />
        <Route path="/eventlist" element={<Eventlist />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        <Route path="/adminpage/:eventId" element={<Events />} />
        {/* <Route path="/addrecords/:Id" element={<AddRecords />} /> */}
        <Route path="/newevent" element={<NewEvent />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/adminbody" element={<AdminBody />} />
        <Route path="/addrow" element={<AddRow />} />
        <Route path="/addcounter" element={<AddCounter />} />
        <Route path="/counterpage" element={<CounterPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/counterregister" element={<CounterRegister />} />
        <Route path="/counterlogin" element={<CounterLogin />} />
        <Route path="/countcoordinator" element={<CountCordinator />} />
        <Route path="/selectlogin" element={<SelectLogin />} />
        <Route
          path="/countcoordinatorregister"
          element={<CountCoordinatorRegister />}
        />
        <Route
          path="/countcoordinatorlogin"
          element={<CountCoordinatorLogin />}
        />
        <Route path="/counterpage/:eventId" element={<EventsCounter />} />
        <Route
          path="/countcoordinator/:eventId"
          element={<EventsCountCoordinator />}
        />
      </Routes>
    </>
  );
}

export default App;
