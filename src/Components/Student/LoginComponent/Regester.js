import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import { AuthContext } from "../../Connections/Auth";
import "./registerstudent.css";

function RegesterSt() {
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
                            Image_Url: "https://drive.google.com/thumbnail?id=1CvtIf9oZqoe4TUrhI61U2-JT4F8cSKaO",
                            User_Id: user.uid,
                            Mentor: "Nill",
                        };
                        setDoc(doc(db, "Student", UserRollnumber), docData).then((e) => {
                            const docData1 = {
                                Roll_Number: UserRollnumber,
                                Designation: "Student"
                            };
                            setDoc(doc(db, "User", user.uid), docData1).then(async (e) => {
                                await localStorage.setItem("userDesignation", "Student");
                                await localStorage.setItem("userroll", UserRollnumber);
                                setRoll("Student");
                            });
                        });
                    }
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                    alert("User Email is already Present !");
                });
        } else {
            alert("User Rollnumber already Present !");
        }
    }

    if (currentUser && (localStorage.getItem("userDesignation") === "Student" || Roll === "Student")) {
        return <Navigate to="/StudentDashBoard"></Navigate>
    }

    return (
        <>

            <div class="global-container">
                <div class="card login-form">
                    <div class="card-body">
                        <h3 class="card-title text-center">Student Register</h3>
                        <div class="card-text">
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                <label for="exampleInputName1">NAME</label>
                                <input type="text" class="form-control form-control-sm" id="exampleInputName1"placeholder="Enter Name" name="name" onChange={e => setUserName(e.target.value)} />
                                </div>
                                <div class="form-group">
                                <label for="exampleInputName1">Roll Number :</label>
                                     <input type="text" class="form-control form-control-sm" id="exampleInputName1" placeholder="Enter your Roll Number" name="rollnumber" onChange={e => setUserRollnumber(e.target.value)} />
                                </div>
                                <div class="form-group">
                                <label for="exampleInputName1"> Email :</label>
                                    <input type="email"  class="form-control form-control-sm" id="exampleInputName1"placeholder="Enter Email Id" name="email" onChange={e => setUserEmail(e.target.value)} />
                                </div>
                                <div class="form-group">
                                <label for="exampleInputName1"> Phone Number :</label>

                                     <input type="text"class="form-control form-control-sm" id="exampleInputName1" placeholder="Enter your Phone Number" name="phonenumber" onChange={e => setUserPhonenumber(e.target.value)} />
                                </div>
                                <div class="form-group">
                                <label for="exampleInputName1">   Password : </label>

                                  <input type={showpasswordtype} class="form-control form-control-sm" id="exampleInputName1"placeholder="Enter Password" name="password" onChange={e => setUserPassword(e.target.value)} />
                                    <input type="checkbox" onClick={(e) => {
                                        if (showpasswordtype === "password") {
                                            setpasswordtype("text");
                                        } else if (showpasswordtype === "text") {
                                            setpasswordtype("password");
                                        }
                                    }} />
                                    Show Password
                                    
                                </div>
                                <input  class="btn btn-primary btn-block"type="submit" value="Signup" />
                            </form>
                            <div class="sign-up">
                                <Link to="/Login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default RegesterSt;