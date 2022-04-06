import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Connections/Auth";
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";

const StaffDashboard = () => {

    const { currentUser } = useContext(AuthContext);

    const [userPhoto, setUserPhoto] = useState('');

    useEffect(async () => {
        const docRef = doc(db, "Staff", localStorage.getItem("userroll"));
        const docSnap = await getDoc(docRef);
        setUserPhoto(docSnap.data().Image_Url);
    });

    function logOut() {
        const auth = getAuth();
        signOut(auth).then(async () => {
            console.log("Log out !");
            localStorage.clear();
        }).catch((error) => {
            console.log(error);
        });
    }
    if (!currentUser) {
        return <Navigate to="/"></Navigate>
    }
    return (
        <>
            <p>User Roll :- {localStorage.getItem("userroll")}</p>
            <p>User Designation :- {localStorage.getItem("userDesignation")}</p>
            <button onClick={logOut} >LogOut</button>
            <br />
            <Link to="/Staff-EditProfile"><img src={userPhoto} width={"250px"} alt="user" /></Link><br /><br />
            <Link to="/AddMentees">Add Mentee's</Link><br /><br />
            <Link to="/DeleteMentee">Remove Mentee's</Link><br /><br />
            <Link to="/ViewMentees">View Mentee's</Link><br /><br />
            <Link to="/Examhome">Exam Mark</Link><br /><br />
            <Link to="/Attendance ">Student Attendance </Link><br /><br />
        </>
    );
}

export default StaffDashboard;