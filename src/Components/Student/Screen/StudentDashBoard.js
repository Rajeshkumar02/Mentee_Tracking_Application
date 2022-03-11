import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Connections/Auth";
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";

const StudentDashboard = () => {

    const { currentUser } = useContext(AuthContext);

    const [userPhoto, setUserPhoto] = useState('');

    useEffect(async () => {
        const docRef = doc(db, "Student", localStorage.getItem("userroll"));
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
            <Link to="/Student-EditProfile"><img src={userPhoto} width={"250px"} alt="image" /></Link><br /><br />
        </>
    );
}

export default StudentDashboard;