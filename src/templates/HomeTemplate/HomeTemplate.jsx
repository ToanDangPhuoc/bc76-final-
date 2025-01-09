import React from "react";
import FooterTemplate from "./components/FooterTemplate";
import { Outlet } from "react-router-dom";
import HeaderTemplate from "./components/HeaderTemplate";
import BodyTemplace from "./components/BodyTemplace";

const HomeTemplate = () => {
  return (
    <>
      <HeaderTemplate />
      <Outlet />
      <FooterTemplate />
    </>
  );
};

export default HomeTemplate;
