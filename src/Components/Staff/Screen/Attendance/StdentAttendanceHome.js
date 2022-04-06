import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { doc, collection, getDocs, getDoc, updateDoc, deleteField, setDoc, deleteDoc, onSnapshot,query, orderBy } from "firebase/firestore";
import { db } from "../../../Connections/Config";

function StdentAttendanceHome() {
    let location = useLocation();

    const [Data, setData] = useState([]);
    const [Attendance, setAttendance] = useState([]);
    const [Date, setDate] = useState("");
    const [index, setindex, getindex] = useState(-1);

    const rollnumber = location.state.user.Roll_Number;

    useEffect(async () => {
        await get();
    }, [db]);

    useEffect(()=>{
        if(Data[getindex]){
            setAttendance(Data[getindex]);
            setDate(Data[getindex].Name);
        }
    },[Data]);

    const get = async () => {
        
        const querySnapshot = onSnapshot(collection(db, rollnumber + "-Attendance"), (docc) => {
            setData([]);
            docc.forEach(async (doc1) => {
                const docRef = doc(db, rollnumber + "-Attendance", doc1.id);
                const docSnap = await getDoc(docRef);
                setData((arr) => arr.concat(docSnap.data()));
                //console.log(Data);
            });
            // console.log(Data);
        });
    }


    const ChangeAttendance = async (x) => {
        // console.log(rollnumber);
        // console.log(rollnumber + "-Attendance"+ Date+x);
        // console.log(Attendance);
        const flag = !Boolean(Attendance[x]);
        // console.log(Attendance[x] + " " + flag + " " + x);
        const UpdateData = doc(db, rollnumber + "-Attendance", Date);
        await setDoc(UpdateData, { [x]: Boolean(flag) }, { merge: true }).then((e) => { alert("done"); });
    }

    const DeleteDate = async () => {
        await deleteDoc(doc(db, rollnumber + "-Attendance", Date)).then((e) => { alert("Deleted"); });
    }

    const Click = async (x,i) => {
        setDate(x.Name);
        setAttendance(x);
        setindex(i);
        // console.log(Data[0][1]);
    }

    // console.log(Attendance);

    return (
        <>
            <center>
                <h2>Attendance</h2><br/>
                {
                    Data.length === 0 ?
                        <>
                            <center><h3>No Data Found !</h3></center>
                        </>
                        :
                        <>
                            {Data.map((user, i) => (
                                <p key={i} onClick={() => {
                                    Click(user,i);
                                }}> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                                        {user.Name}
                                    </button></p>
                            ))}
                        </>
                }
            </center>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Student Attendance</h5>
                            <button type="button" onClick={() => DeleteDate()} className="btn btn-danger">Delete</button>
                        </div>
                        <div className="modal-body">
                            <table style={{ width: "100%", height: "100px" }}>
                                <thead>
                                    <tr>
                                        <th>Period</th>
                                        <th>Present/Absent</th>
                                        <th>Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                    </tr>
                                    {
                                        Object.keys(Attendance).map(key => {
                                            return (
                                                <tr key={key}>
                                                    {
                                                        key !== "Name" ?
                                                            <>
                                                                <td>
                                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                                </td>
                                                                <td>
                                                                    {Attendance[key] ? <><p style={{ color: "green" }}>Present</p></> : <><p style={{ color: "red" }}>Absent</p></>}
                                                                </td>
                                                                <td>
                                                                    {Attendance[key] ? <><button type="button" onClick={() => ChangeAttendance(key)} className="btn btn-danger">✘</button></> : <><button type="button" onClick={() => ChangeAttendance(key)} className="btn btn-success">✔</button></>}
                                                                </td>
                                                            </>
                                                            :
                                                            <>
                                                            </>
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StdentAttendanceHome;