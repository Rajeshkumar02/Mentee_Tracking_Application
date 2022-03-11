import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../Connections/Config";
const MenteeList = () => {

    const [Data, setData] = useState([]);
    const [Data1, setData1] = useState([]);
    const [Search, setSearch] = useState('');

    const [name, setname] = useState();
    const [rollnumber, setrollnumber] = useState();
    const [userphoto, setuserphoto] = useState();
    const [phone, setphone] = useState();
    const [email, setemail] = useState();

    useEffect(async () => {
        await get();
        //console.log(Data);
    }, []);
    const get = async () => {
        const querySnapshot = await getDocs(collection(db, localStorage.getItem("userroll")));
        querySnapshot.forEach(async (doc1) => {
            const docRef = doc(db, "Student", doc1.id);
            const docSnap = await getDoc(docRef);
            setData((arr) => arr.concat(docSnap.data()));
            setData1((arr) => arr.concat(docSnap.data()));
            //console.log(Data);
        });
        // console.log(Data);
    }

    const Click = (user) => {
        setname(user.Name);
        setrollnumber(user.Roll_Number);
        setuserphoto(user.Image_Url);
        setphone(user.Phone);
        setemail(user.Email);
    }

    const Sear = (val) => {
        let result = Data1.filter(item => {
            const itemData = item.Roll_Number;
            const resdata = itemData.indexOf(val) > -1;
            return resdata;
        });
        if (result.length === 0) {
            result = ["null"]
        }
        console.log(result);

        setSearch(result);
    }

    return (
        <>
            <center>
                {
                    Search.length === 0
                        ?
                        Data.length === 0
                            ?
                            <>
                                <h4><center>Loading...</center></h4>
                            </>
                            :
                            <>
                                <input type="text" onChange={(e) => { Sear(e.target.value) }} placeholder="Enter the Roll Number" /><br /><br />
                                {Data.map((user, i) => (
                                    <p key={i} onClick={() => {
                                        Click(user);
                                    }}> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                                            {user.Roll_Number}
                                        </button></p>
                                ))}
                            </>
                        :
                        Search[0] !== "null"
                            ?
                            <>
                                <input type="text" onChange={(e) => { Sear(e.target.value) }} placeholder="Enter the Roll Number" /><br /><br />
                                {Search.map((user, i) => (
                                    <p key={i} onClick={() => {
                                        Click(user);
                                    }}> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                                            {user.Roll_Number}
                                        </button></p>
                                ))}
                            </>
                            :
                            <>
                                <input type="text" onChange={(e) => { Sear(e.target.value) }} placeholder="Enter the Roll Number" /><br /><br />
                                <center><h3>User Roll Number not available</h3></center>
                            </>
                }
            </center>

            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Student Information</h5>
                        </div>
                        <div className="modal-body">
                            <center><img src={userphoto} className="rounded-circle" alt="Rounded Image" width="200" height="200" /></center>
                            <table style={{ width: "100%", height: "100px" }}>
                                <tbody>
                                    <tr>
                                        <td>Name </td>
                                        <td> : {name}</td>
                                    </tr>
                                    <tr>
                                        <td>Roll Number </td>
                                        <td> : {rollnumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone </td>
                                        <td> : {phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Email </td>
                                        <td> : {email}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenteeList;