import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Login from "../Staff/LoginComponent/Login";
import Register from "../Staff/LoginComponent/Regester";

const AuthStack = () => {
    return (
        <Router >
            <Routes >
                <Route exact path="/" element={<Navigate to="/Login" />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Register" element={<Register />} />
            </Routes >
        </Router>
    );
}

export default AuthStack;