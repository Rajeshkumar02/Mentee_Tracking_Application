import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function StudentEditProfile() {

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [UserPhonenumber, setUserPhonenumber] = useState('');
    const [UserPhoto, setUserPhoto] = useState('');
    const [flag, setFlag] = useState(true);
    const [Change, setChange] = useState('');

    useEffect(async () => {
        const docRef = doc(db, "Student", localStorage.getItem("userroll"));
        const docSnap = await getDoc(docRef);
        if (flag) {
            setUserName(docSnap.data().Name);
            setUserEmail(docSnap.data().Email);
            setUserPhonenumber(docSnap.data().Phone);
            setUserPhoto(docSnap.data().Image_Url);
            setFlag(false);
        }
        setChange(docSnap.data().Image_Url);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Change !== UserPhoto) {
            const storage = getStorage();
            const storageRef = ref(storage, '/Student-Images/' + localStorage.getItem("userroll"));
            const uploadTask = uploadBytesResumable(storageRef, UserPhoto);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setChange(downloadURL);
                        const UpdateData = doc(db, 'Student', localStorage.getItem("userroll"));
                        setDoc(UpdateData, {
                            Name: userName,
                            Email: userEmail,
                            Phone: UserPhonenumber,
                            Image_Url: downloadURL,
                        }, { merge: true }).then((e) => {
                            //console.log(userName + " " + UserRollnumber + " " + userEmail + " " + UserPhonenumber + " " + UserPhoto);
                            alert("Upadate successfull");
                        });
                    }
                    );
                });
        } else {
            const UpdateData = doc(db, 'Student', localStorage.getItem("userroll"));
            setDoc(UpdateData, {
                Name: userName,
                Email: userEmail,
                Phone: UserPhonenumber,
                Image_Url: UserPhoto,
            }, { merge: true }).then((e) => {
                //console.log(userName + " " + UserRollnumber + " " + userEmail + " " + UserPhonenumber + " " + UserPhoto);
                alert("Upadate successfull");
            });
        }
    }


    const uploadimage = (e) => {
        setUserPhoto(e.target.files[0]);
    }

    return (
        <>
            <center>
                <h2 class="font-monospace text-decoration-underline">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    Name : <input type="text" placeholder={userName} name="username" onChange={e => setUserName(e.target.value)} /><br /><br />
                    Phone : <input type="text" placeholder={UserPhonenumber} name="userphone" onChange={e => setUserPhonenumber(e.target.value)} /><br /><br />
                    <img alt="not fount" width={"250px"} src={Change} /><br/><br/>
                    <input class="btn btn-primary" type="file" name="userimage" onChange={uploadimage} /><br /><br />
                    <input class="btn btn-success" type="submit" value="Update" />
                </form>
                <br />
            </center>
        </>
    )
}

export default StudentEditProfile;