import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { doc, collection, getDocs, getDoc, updateDoc, deleteField, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../Connections/Config";


const StudentExamHome = () => {
    let location = useLocation();

    const [Data, setData] = useState([]);
    const [Marks, setMarks] = useState([]);
    const [exam_name, setexam] = useState("");
    const [subjectname, setsubjectname] = useState("");
    const [subjectmark, setsubjectmark] = useState();

    const rollnumber = location.state.user.Roll_Number;

    useEffect(async () => {
        await get();
    }, [db]);
    const get = async () => {
        const querySnapshot = await getDocs(collection(db, rollnumber + "-Exams"));
        querySnapshot.forEach(async (doc1) => {
            const docRef = doc(db, rollnumber + "-Exams", doc1.id);
            const docSnap = await getDoc(docRef);
            setData((arr) => arr.concat(docSnap.data()));
            //console.log(Data);
        });
        // console.log(Data);
    }


    const DeleteSubject = async (x) => {
        // console.log(rollnumber + "-Exams"+ exam_name+x);
        const subject = doc(db, rollnumber + "-Exams", exam_name);
        await updateDoc(subject, {
            [x]: deleteField()
        }).then((e) => { alert("Done"); window.location.reload(false); });
    }

    const DeleteExam = async () => {
        await deleteDoc(doc(db, rollnumber + "-Exams", exam_name)).then((e) => { alert("Deleted"); window.location.reload(false); });
    }

    const Click = async (x) => {
        setexam(x.Name);
        setMarks(x);
    }

    const addsubject = async () => {
        const add = doc(db, rollnumber + "-Exams", exam_name);
        setDoc(add, { [subjectname]: subjectmark }, { merge: true }).then((e) => { alert("done"); setsubjectmark(""); setsubjectname(""); window.location.reload(false); });
    }

    return (
        <>
            <center>
                <h2>Exams</h2><br />
                <Link
                    className="btn btn-primary"
                    to={{
                        pathname: "/AddNewExam",
                    }}
                    state={{ rollnumber }}
                >
                    Add New Exam !
                </Link><br /><br />
                {
                    Data.length === 0 ?
                        <>
                            <center><h3>No Data Found</h3></center>
                        </>
                        :
                        <>
                            {Data.map((user, i) => (
                                <p key={i} onClick={() => {
                                    Click(user);
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
                            <h5 className="modal-title" id="exampleModalLongTitle">Student Mark</h5>
                            <button type="button" onClick={() => DeleteExam()} className="btn btn-danger">Delete</button>
                        </div>
                        <div className="modal-body">
                            <table style={{ width: "100%", height: "100px" }}>
                                <thead>
                                    <tr>
                                        <td>Course Name</td>
                                        <td>Mark</td>
                                        <td>Result</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(Marks).map(key => {
                                            return (
                                                <tr key={key.charAt(0) + key.slice(1)}>
                                                    {
                                                        key !== "Name" ?
                                                            <>
                                                                <td>
                                                                    {key.charAt(0) + key.slice(1)}
                                                                </td>
                                                                <td>
                                                                    {Marks[key]}
                                                                </td>
                                                                <td>
                                                                    {Marks[key] >= 50 ? <><p style={{ color: "green" }}>P</p></> : <><p style={{ color: "red" }}>F</p></>}
                                                                </td>
                                                                <td>
                                                                    <button type="button" onClick={() => DeleteSubject(key.charAt(0) + key.slice(1))} className="btn btn-danger">Delete</button>
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
                        <div className="modal-footer">
                            <div className="row">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Enter Subject Name" onChange={(e) => setsubjectname(e.target.value)} required />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Enter Subject Mark" onChange={(e) => setsubjectmark(e.target.value)} required />
                                </div>
                            </div>
                            <button className="btn btn-success" onClick={addsubject}>Add/Update</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentExamHome;