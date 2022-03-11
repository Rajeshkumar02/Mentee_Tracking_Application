import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { doc, collection, getDocs, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Connections/Config";


const StudentExamHome = () => {
    let location = useLocation();

    const [Data, setData] = useState([]);

    const rollnumber = location.state.user.Roll_Number;

    useEffect(async () => {
        await get();
        //console.log(Data);
    }, []);
    const get = async () => {
        const querySnapshot = await getDocs(collection(db, rollnumber + "-" + "Exams"));
        querySnapshot.forEach(async (doc1) => {
            const docRef = doc(db, "Student", doc1.id);
            const docSnap = await getDoc(docRef);
            setData((arr) => arr.concat(docSnap.data()));
            //console.log(Data);
        });
        // console.log(Data);
    }
    return (
        <>
            {Data.map((user, i) => (
                <p key={i}>{user}</p>
            ))}
        </>
    );
}

export default StudentExamHome;