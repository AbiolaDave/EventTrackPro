import React from 'react';
import MainNavbar from "../Components/MainNavbar";
import CreateEvents from '../Components/Admin/CreateEvents';
import FooterHome from '../Components/FooterHome';
import FooterComp from '../Components/FooterComp';

const NewEvent = () => {
  return (
    <>
    <MainNavbar />
    <CreateEvents />
    <FooterComp />
    </>
  )
}

export default NewEvent