import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import { AuthContext } from "../../Connections/Auth";

function AddMentees() {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [RollNumber, setRollNumber] = useState('');
    const [UserRollnumber, setUserRollnumber] = useState('');
    const [UserPhonenumber, setUserPhonenumber] = useState('');
    const [UserPhoto, setUserPhoto] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [Present, setPresent] = useState(false);
    const [Flag, setFlag] = useState(false);
    const [Mentor, setMentor] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (UserRollnumber !== "") {
            const docRef = doc(db, "Student", UserRollnumber);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserName(docSnap.data().Name);
                setUserEmail(docSnap.data().Email);
                setUserPhonenumber(docSnap.data().Phone);
                setRollNumber(UserRollnumber);
                setUserPhoto(docSnap.data().Image_Url);
                setMentor(docSnap.data().Mentor);
                //console.log(docSnap.data());
                setPresent(true);
            } else {
                //console.log("Not Found !");
                setFlag(true);
                setPresent(false);
            }
        } else {
            alert("Enter the roll number !");
        }
    }

    const AddMentee = async (e) => {
        if (UserRollnumber !== "") {
            if (Mentor === "Nill") {
                const docData = {
                    Attendance: RollNumber + "-Attendance",
                    Exams: RollNumber + "-Exams",
                };
                await setDoc(doc(db, localStorage.getItem("userroll"), RollNumber), docData).then((e) => {
                    const UpdateData = doc(db, 'Student', RollNumber);
                    setDoc(UpdateData, { Mentor: localStorage.getItem("userroll") }, { merge: true }).then(async (e) => {
                        clearState()
                    });
                });
            } else {
                alert(RollNumber + " is alreay belongs to " + Mentor);
            }
        } else {
            alert("Enter the User Roll Number !");
        }
    }

    const clearState = () => {
        setUserEmail("");
        setUserName("");
        setRollNumber("");
        setUserRollnumber("");
        setUserPhonenumber("");
        setUserPhoto("");
        setMentor("");
        setPresent(false);
        setFlag(false);

        alert("mentee Added Successfully !");
    }


    if (!currentUser) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <>
            <center>
                <h2 class="font-monospace text-decoration-underline">Add Mentee</h2>
                <form onSubmit={handleSubmit}>
                    <p class="text-muted"><b>Roll Number : </b><input type="text" value={UserRollnumber} placeholder="Enter your Roll Number" name="rollnumber" onChange={e => setUserRollnumber(e.target.value)} /></p>
                    <input class="btn btn-primary" type="submit" value="View" />
                </form><br />
                {
                    UserRollnumber !== ""
                        ?
                        Present
                            ?
                            <>
                                <div className="card" style={{ "width": 25 + "rem" }}>
                                    <img className="card-img-top" src={UserPhoto} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            <table className="table table-borderless">
                                                <tbody>
                                                    <tr>
                                                        <b><td>Name</td></b>
                                                        <td>: {userName} </td>
                                                    </tr>
                                                    <tr>
                                                        <b><td>Roll Number</td></b>
                                                        <td>: {RollNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <b><td>Email </td></b>
                                                        <td>: {userEmail}</td>
                                                    </tr>
                                                    <tr>
                                                        <b><td>Phone</td></b>
                                                        <td>: {UserPhonenumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <b><td>Mentor Id</td></b>
                                                        <td>: {Mentor}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </h5>
                                        <button class="btn btn-success" onClick={AddMentee} >Add Mentee</button>
                                    </div>
                                </div>
                            </>
                            :
                            Flag
                                ?
                                <>
                                    <center>
                                        <p>No Data Found!</p>
                                    </center>
                                </>
                                :
                                <>
                                </>
                        :
                        <>
                        </>
                }
            </center >
        </>
    );
}

export default AddMentees;