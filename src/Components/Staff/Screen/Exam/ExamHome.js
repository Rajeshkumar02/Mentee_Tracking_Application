import React, { useState, useEffect } from "react";
import { doc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../Connections/Config";
import { Link } from "react-router-dom";



const ExamHome = (props) => {

    const [Data, setData] = useState([]);
    const [Data1, setData1] = useState([]);
    const [Search, setSearch] = useState('');

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

    // const Click = (user) => {
    //     console.log(user);
    //     // <Navigate to="/StudentExamHome" />
    //     return (
    //         <>
    //             {user.Name}
    //             <StudentExamHome rollNumber={user.Roll_Number} />
    //         </>
    //     );
    // }

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
                                <h4><center>Loading .... !</center></h4>
                            </>
                            :
                            <>
                                <input type="text" onChange={(e) => { Sear(e.target.value) }} placeholder="Enter the Roll Number" /><br /><br />
                                {Data.map((user, i) => (
                                    <p key={i}>
                                        <Link
                                            className="btn btn-primary"
                                            to={{
                                                pathname: "/StudentExamHome",
                                                hash: user.Roll_Number
                                            }}
                                            state={{ user }}
                                        >
                                            {user.Roll_Number}
                                        </Link>
                                    </p>
                                ))}
                            </>
                        :
                        Search[0] !== "null"
                            ?
                            <>
                                <input type="text" onChange={(e) => { Sear(e.target.value) }} placeholder="Enter the Roll Number" /><br /><br />
                                {Search.map((user, i) => (
                                    <p key={i}>
                                        <Link
                                            className="btn btn-primary"
                                            to={{
                                                pathname: "/StdentExamHome",
                                            }}
                                            state={{ user }}
                                        >
                                            {user.Roll_Number}
                                        </Link>
                                    </p>
                                ))}
                            </>
                            :
                            <>
                                <input type="text" onChange={(e) => { Sear(e.target.value) }} placeholder="Enter the Roll Number" /><br /><br />
                                <center><h3>User Roll Number not available</h3></center>
                            </>
                }
            </center>
        </>
    );
}

export default ExamHome;