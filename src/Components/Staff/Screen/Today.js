import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";

function Today(props) {

    const [Data, setData] = useState([]);
    const [Present, setPresent] = useState(0);
    const [Absent, setAbsent] = useState(0);

    useEffect(async () => {
        const docRef = doc(db, "Student", "Attendance");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setData(docSnap.data());
            console.log("==>"+Object.keys(Data));
            if (docSnap.data()) {
                setPresent(Present + 1);
            } else {
                setAbsent(Absent + 1);
            }
        } else {
            console.log("No such document!");
        }
    }, [db]);

    // console.log(props.students);

    return (
        <>
            <center>

                {Data.length < 0 ?
                    <></>
                    :
                    <>
                        <b>Today's Attendance</b>
                        <table style={{ width: 50 + "%" }}>
                            <thead>
                                <tr>
                                    <th>Student RollNumber</th>
                                    <th>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(Data).map((key, i) => (
                                        <tr key={i}>
                                            <td>{key}</td>
                                            <td>{Data[key] ? <p style={{ color: "green" }} >Present</p> : <p style={{ color: "red" }}>Absent</p>}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </>
                }
            </center>
        </>
    );
}

export default Today;