import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Connections/Auth";
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../Connections/Config";
import Today from "./Today";
import Lottie from "react-lottie";
import Add_User from "../Lotifiles/Add_User.json";
import Delete_User from "../Lotifiles/Delete_User.json";
import View_Mentee from "../Lotifiles/View_Mentee.json";
import Exam_Mark from "../Lotifiles/Exam_Mark.json";
import Attendance from "../Lotifiles/Attendance.json"
import "./CSS/Staffdash.css";

const StaffDashboard = () => {

    const { currentUser } = useContext(AuthContext);

    const [userPhoto, setUserPhoto] = useState('');
    const [Students, setStudents] = useState([]);

    const adduser = {
        loop: true,
        autoplay: true,
        animationData: Add_User,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const deleteuser = {
        loop: true,
        autoplay: true,
        animationData: Delete_User,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const viewmentee = {
        loop: true,
        autoplay: true,
        animationData: View_Mentee,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const exams = {
        loop: true,
        autoplay: true,
        animationData: Exam_Mark,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const attendance = {
        loop: true,
        autoplay: true,
        animationData: Attendance,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    useEffect(async () => {
        const docRef = doc(db, "Staff", localStorage.getItem("userroll"));
        const docSnap = await getDoc(docRef);
        setUserPhoto(docSnap.data().Image_Url);
        const querySnapshot = await getDocs(collection(db, localStorage.getItem("userroll")));
        querySnapshot.forEach((doc) => {
            // console.log(doc.id);
            setStudents([...Students, doc.id]);
        });
    }, [db]);

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
    // console.log(Students);
    return (
        <>
            <header>
                <div>
                    <div class="profile-userpic">
                        <Link to="/Staff-EditProfile" data-toggle="tooltip" data-placement="top" title="Edit Profile"><img src={userPhoto} width={"100px"} alt="user" /></Link><br /><br />
                    </div>

                    <div className="button">
                        <button onClick={logOut} className="btn btn-danger">LogOut</button>
                    </div>
                    <div className="userid">
                        <b>
                            <p>User Roll :- {localStorage.getItem("userroll")}</p>
                            <p>User Designation :- {localStorage.getItem("userDesignation")}</p>
                        </b>
                    </div>
                </div>
            </header>

            <br /><br /><br /><br /><br />
            <Today students={Students} />
            <div className="down">
                <Link to="/AddMentees">
                    <Lottie options={adduser} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="Add Mentee" />
                </Link>
                <Link to="/DeleteMentee">
                    <Lottie options={deleteuser} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="Delete Mentee" />
                </Link>
                <Link to="/ViewMentees">
                    <Lottie options={viewmentee} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="View Mentee" />
                </Link>
                <Link to="/Examhome">
                    <Lottie options={exams} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="Exam Marks" />
                </Link>
                <Link to="/Attendance ">
                    <Lottie options={attendance} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="Attendence" />
                </Link>
            </div>
        </>
    );
}

export default StaffDashboard;