import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Connections/Auth";
import { getAuth, signOut } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import Lottie from "react-lottie";
import Exam_Mark from "../../Staff/Lotifiles/Exam_Mark.json";
import Attendance from "../../Staff/Lotifiles/Attendance.json";
import Walking from "../../Staff/Lotifiles/Walking.json"

const StudentDashboard = () => {

    const { currentUser } = useContext(AuthContext);

    const [userPhoto, setUserPhoto] = useState('');

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

    const walking = {
        loop: true,
        autoplay: true,
        animationData: Walking,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

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
            <header>
                <div>
                    <div class="profile-userpic">
                        <Link to="/Student-EditProfile" data-toggle="tooltip" data-placement="top" title="Edit Profile"><img src={userPhoto} width={"100px"} alt="user" /></Link><br /><br />
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
            <br /><br /><br /><br />
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <Link to="/Home">
                                <Lottie options={exams} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="View Exam Marks" />
                            </Link>
                        </td>
                        <td>
                            <Link to="/StdentAttendance">
                                <Lottie options={attendance} speed={1} height={100} width={100} data-toggle="tooltip" data-placement="top" title="view Attendence" />
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
            <center><Lottie options={walking} speed={1} height={500} width={500} /></center>
        </>
    );
}

export default StudentDashboard;