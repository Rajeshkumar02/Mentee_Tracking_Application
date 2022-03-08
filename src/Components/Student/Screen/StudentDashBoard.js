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
            {userPhoto}
            <h1>User Roll : = </h1>
            <br />
            <img src={userPhoto} alt="image" />
            <button onClick={logOut} >LogOut</button>
            <p>{localStorage.getItem("userDesignation")}</p>
        </>
    );
}

export default StudentDashboard;