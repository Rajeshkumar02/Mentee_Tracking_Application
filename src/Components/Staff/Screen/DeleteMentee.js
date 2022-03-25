import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import { AuthContext } from "../../Connections/Auth";

const DeleteMentee = () => {

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
            const pres = doc(db, localStorage.getItem("userroll"), UserRollnumber);
            const presSnap = await getDoc(pres);
            if (presSnap.exists()) {
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
                alert("Student is not belongs to you !");
                clearState();
            }
        } else {
            alert("Enter the roll number !");
        }
    }

    const RemoveMentee = async (e) => {
        if (UserRollnumber !== "") {
            if (Mentor === localStorage.getItem("userroll")) {
                await deleteDoc(doc(db, localStorage.getItem("userroll"), RollNumber)).then(() => {
                    const UpdateData = doc(db, 'Student', RollNumber);
                    setDoc(UpdateData, { Mentor: "Nill" }, { merge: true }).then(async (e) => {
                        clearState();
                    });
                });
            } else {
                alert("Student is not belongs to you !");
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

        alert("mentee Removed Successfully !");
    }


    if (!currentUser) {
        return <Navigate to="/"></Navigate>
    }

    return (
        <>
            <center>
                <h5>Remove Mentee's</h5>
                <form onSubmit={handleSubmit}>
                    Roll Number : <input type="text" value={UserRollnumber} placeholder="Enter your Roll Number" name="rollnumber" onChange={e => setUserRollnumber(e.target.value)} /><br /><br />
                    <input type="submit" value="View" />
                </form><br /><br />
                {
                    UserRollnumber !== ""
                        ?
                        Present
                            ?
                            <>
                                Name : {userName} <br />
                                Roll Number : {RollNumber}<br />
                                Email : {userEmail} <br />
                                Phone : {UserPhonenumber} <br />
                                Photo :- <br />
                                <img src={UserPhoto} alt="user" /><br /><br ></br>
                                <button onClick={RemoveMentee} >Remove Mentee</button>
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
            </center>
        </>
    );
}

export default DeleteMentee;