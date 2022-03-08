import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import { AuthProvider } from "./Components/Connections/Auth";
import Login from "./Components/Staff/LoginComponent/Login";
import Register from "./Components/Staff/LoginComponent/Regester";
import StaffDashboard from "./Components/Staff/Screen/StaffDashboard";
import RegesterSt from "./Components/Student/LoginComponent/Regester";
import StudentDashboard from "./Components/Student/Screen/StudentDashBoard";
import AddMentees from "./Components/Staff/Screen/AddMentees";
import EditProfile from "./Components/Staff/Screen/EditProfile";
import DeleteMentee from "./Components/Staff/Screen/DeleteMentee";
import MenteeList from "./Components/Staff/Screen/MenteeList";
import PageNotFound from "./Components/NotFound";

const App = () => {
  return (<AuthProvider >
    <Router >
      <Routes >
        <Route exact path="/" element={<Navigate to="/Login" />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/DashBoard" element={<StaffDashboard />} />
        <Route exact path="/StudentRegester" element={<RegesterSt />} />
        <Route exact path="/StudentDashBoard" element={<StudentDashboard />} />
        <Route exact path="/AddMentees" element={<AddMentees />} />
        <Route exact path="/DeleteMentee" element={<DeleteMentee />} />
        <Route exact path="/ViewMentees" element={<MenteeList />} />
        <Route exact path="/Staff-EditProfile" element={<EditProfile />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes >
    </Router>
  </AuthProvider>
  );
}

export default App;