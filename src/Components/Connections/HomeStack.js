import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import StaffDashboard from "../Staff/Screen/StaffDashboard";

const HomeStack = () => {
  return (
    <Router >
      <Routes >
        <Route exact path="/" element={<Navigate to="/DashBoard" />} />
        <Route exact path="DashBoard" element={<StaffDashboard />} />
      </Routes >
    </Router>
  );
}

export default HomeStack;