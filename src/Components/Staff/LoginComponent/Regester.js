import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import { AuthContext } from "../../Connections/Auth";

function Register() {
    const [showpasswordtype, setpasswordtype] = useState("password");
    const auth = getAuth();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [UserRollnumber, setUserRollnumber] = useState('');
    const [UserPhonenumber, setUserPhonenumber] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [Roll, setRoll] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "Staff", UserRollnumber);
        const docSnap = await getDoc(docRef);


        if (!docSnap.exists()) {
            createUserWithEmailAndPassword(auth, userEmail, userPassword)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        console.log("Login Successfull !");
                        const docData = {
                            Name: userName,
                            Email: userEmail,
                            Roll_Number: UserRollnumber,
                            Phone: UserPhonenumber,
                            Image_Url: "https://drive.google.com/thumbnail?id=1_nI1rqXVE2hQPOA5dyc8-hNJz3jeLrlX",
                            User_Id: user.uid,
                        };
                        setDoc(doc(db, "Staff", UserRollnumber), docData).then((e) => {
                            const docData1 = {
                                Roll_Number: UserRollnumber,
                                Designation: "Staff"
                            };
                            setDoc(doc(db, "User", user.uid), docData1).then(async (e) => {
                                await localStorage.setItem("userDesignation", "Staff");
                                await localStorage.setItem("userroll", UserRollnumber);
                                setRoll("Staff");
                            });
                        });
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    alert("User Email is already Present !");
                });
        } else {
            alert("User Rollnumber already Present !");
        }
    }

    if (currentUser && (localStorage.getItem("userDesignation") === "Staff" || Roll === "Staff")) {
        return <Navigate to="/DashBoard"></Navigate>
    }

    return (
        <>
            <center>
                <h5>Register</h5>
                <form onSubmit={handleSubmit}>
                    Name : <input type="text" placeholder="Enter Name" name="name" onChange={e => setUserName(e.target.value)} /><br /><br />
                    Roll Number : <input type="text" placeholder="Enter your Roll Number" name="rollnumber" onChange={e => setUserRollnumber(e.target.value)} /><br /><br />
                    Email : <input type="email" placeholder="Enter Email Id" name="email" onChange={e => setUserEmail(e.target.value)} /><br /><br />
                    Phone Number : <input type="text" placeholder="Enter your Phone Number" name="phonenumber" onChange={e => setUserPhonenumber(e.target.value)} /><br /><br />
                    Password : <input type={showpasswordtype} placeholder="Enter Password" name="password" onChange={e => setUserPassword(e.target.value)} />
                    <input type="checkbox" onClick={(e) => {
                        if (showpasswordtype === "password") {
                            setpasswordtype("text");
                        } else if (showpasswordtype === "text") {
                            setpasswordtype("password");
                        }
                    }} />Show Password
                    <br /><br />
                    <input type="submit" value="Signup" />
                </form>
                <Link to="/Login">Login</Link>
            </center>
        </>
    );
}

export default Register;