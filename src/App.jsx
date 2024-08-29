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
      <Routes basename="/eventtrackpro">
        <Route path="/eventtrackpro/" element={<Home />} />
        <Route path="/eventtrackpro/register" element={<Register />} />
        <Route path="/eventtrackpro/login" element={<Login />} />
        <Route path="/eventtrackpro/dashboard" element={<Dashboard />} />
        <Route path="/eventtrackpro/adminmenu" element={<AdminMenu />} />
        <Route
          path="/eventtrackpro/adminregister"
          element={<AdminRegister />}
        />
        <Route path="/eventtrackpro/createevents" element={<CreateEvents />} />
        <Route path="/eventtrackpro/trial" element={<Trial />} />
        <Route path="/eventtrackpro/eventlist" element={<Eventlist />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        <Route path="/eventtrackpro/adminpage/:eventId" element={<Events />} />
        {/* <Route path="/addrecords/:Id" element={<AddRecords />} /> */}
        <Route path="/eventtrackpro/newevent" element={<NewEvent />} />
        <Route path="/eventtrackpro/adminpage" element={<AdminPage />} />
        <Route path="/eventtrackpro/adminbody" element={<AdminBody />} />
        <Route path="/eventtrackpro/addrow" element={<AddRow />} />
        <Route path="/eventtrackpro/addcounter" element={<AddCounter />} />
        <Route path="/eventtrackpro/counterpage" element={<CounterPage />} />
        <Route path="/eventtrackpro/adminlogin" element={<AdminLogin />} />
        <Route
          path="/eventtrackpro/counterregister"
          element={<CounterRegister />}
        />
        <Route path="/eventtrackpro/counterlogin" element={<CounterLogin />} />
        <Route
          path="/eventtrackpro/countcoordinator"
          element={<CountCordinator />}
        />
        <Route path="/eventtrackpro/selectlogin" element={<SelectLogin />} />
        <Route
          path="/eventtrackpro/countcoordinatorregister"
          element={<CountCoordinatorRegister />}
        />
        <Route
          path="/eventtrackpro/countcoordinatorlogin"
          element={<CountCoordinatorLogin />}
        />
        <Route
          path="/eventtrackpro/counterpage/:eventId"
          element={<EventsCounter />}
        />
        <Route
          path="/eventtrackpro/countcoordinator/:eventId"
          element={<EventsCountCoordinator />}
        />
      </Routes>
    </>
  );
}

export default App;
