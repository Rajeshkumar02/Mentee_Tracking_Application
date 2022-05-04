import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import { AuthContext } from "../../Connections/Auth";
import "./Loginstyle.css";


function Login() {
    const [showpasswordtype, setpasswordtype] = useState("password");
    const auth = getAuth();
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [Error, setError] = useState("");
    const { currentUser } = useContext(AuthContext);
    const [Roll, setRoll] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, userEmail, userPassword)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user) {
                    const docRef = doc(db, "User", user.uid);
                    const docSnap = await getDoc(docRef);
                    //console.log(docSnap.data().Roll_Number + "   " + docSnap.data().Designation);
                    if (docSnap.data().Designation === "Staff") {
                        await localStorage.setItem("userDesignation", docSnap.data().Designation);
                        await localStorage.setItem("userroll", docSnap.data().Roll_Number);
                        setRoll(docSnap.data().Designation);
                    } else if (docSnap.data().Designation === "Student") {
                        await localStorage.setItem("userDesignation", docSnap.data().Designation);
                        await localStorage.setItem("userroll", docSnap.data().Roll_Number);
                        setRoll(docSnap.data().Designation);
                    }
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/user-not-found") {
                    setError("Check your Email or Password !")
                }
            });

    }

    if (currentUser && (localStorage.getItem("userDesignation") === "Staff" || Roll === "Staff")) {
        return <Navigate to="/DashBoard"></Navigate>
    }

    if (currentUser && (localStorage.getItem("userDesignation") === "Student" || Roll === "Student")) {
        return <Navigate to="/StudentDashBoard"></Navigate>
    }

    return (
        <>
            <div class="global-container">
                <div class="card login-form">
                    <div class="card-body">
                        <h3 class="card-title text-center">Login</h3>
                        <div class="card-text">
                            <form onSubmit={handleSubmit}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" class="form-control form-control-sm" id="exampleInputEmail1"
                                        aria-describedby="emailHelp" placeholder="Enter Email Id" name="email" onChange={e => setUserEmail(e.target.value)} />
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type={showpasswordtype} class="form-control form-control-sm" id="exampleInputPassword1" placeholder="Enter Password" name="password" onChange={e => setUserPassword(e.target.value)} />
                                    <br/>
                                    <input type="checkbox" onClick={(e) => {
                                        if (showpasswordtype === "password") {
                                            setpasswordtype("text");
                                        } else if (showpasswordtype === "text") {
                                            setpasswordtype("password");
                                        }
                                    }} />Show Password
                                    <br />
                                </div>
                                <input class="btn btn-primary btn-block" type="submit" value="Login" />
                            </form>
                            <div class="sign-up">
                                <Link to="/Register">Staff Register</Link><br /><br />
                                <Link to="/StudentRegester">Student Register</Link><br /><br /></div>
                            {Error}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
