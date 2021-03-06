import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
import "./CSS/Today.css";

function Today(props) {

    const [Data, setData] = useState([]);
    const [Present, setPresent] = useState(0);
    const [Absent, setAbsent] = useState(0);

    useEffect(async () => {
        var date = new window.Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        // console.log(day + "-" + month + "-" + year);
        const docRef = doc(db, "Attendance", day + "-" + month + "-" + year);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setData(docSnap.data());
            console.log("==>" + Object.keys(Data));
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
                        <b style={{"font-size": 30+"px"}}>Today's Attendance</b>
                        <br/><br/><br/>
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table class="table table-bordered table-striped mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Student RollNumber</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(Data).map((key, i) => (
                                            <tr key={i}>
                                                <td scope="row">{key}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }
            </center>
        </>
    );
}

export default Today;