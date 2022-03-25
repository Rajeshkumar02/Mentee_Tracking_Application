import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../Connections/Config";


function AddNewExam(props) {
  const [inputList, setInputList] = useState([{ subject: "", mark: "" }]);
  const [ExamName, setExamName] = useState("");

  let location = useLocation();
  const rollnumber = location.state.rollnumber;
  // console.log(rollnumber);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { subject: "", mark: "" }]);
  };

  const Submit = async () => {
    if (ExamName.length !== 0) {
      const documents = doc(db, rollnumber + "-Exams", ExamName);
      await setDoc(documents, { "Name": ExamName }, { merge: true });
      await inputList.map((exam) => { if (exam.subject.length !== 0 && exam.mark.length !== 0) { const document = doc(db, rollnumber + "-Exams", ExamName);setDoc(document, { [exam.subject]: exam.mark }, { merge: true }); }else{alert("Invalid Credentials")} });
      alert("Done");
    } else {
      alert("Enter the Exame Name !");
    }
  }

  return (
    <>
      <center>
        <h3>Add New Exam</h3>
        <form>
          <input type="text" onChange={(e) => setExamName(e.target.value)} placeholder="eg,sem_1_ciat_1" required></input><br /><br />
          {
            inputList.map((x, i) => {
              return (
                <div className="box" key={i}>
                  <input
                    name="subject"
                    placeholder="Enter Subject Name"
                    value={x.subject}
                    onChange={e => handleInputChange(e, i)
                    } required
                  />
                  <input
                    className="ml10"
                    name="mark"
                    placeholder="Enter Mark"
                    value={x.mark}
                    onChange={e => handleInputChange(e, i)} required
                  />
                  <div className="btn-box">
                    {inputList.length !== 1 && <button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}>Remove</button>}
                    <br />
                    {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
                  </div>
                </div>
              );
            })}
          <br /><br />
        </form>
        <button type="button" className="btn btn-success" onClick={Submit}>Submit</button>
      </center>
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </>
  );
}

export default AddNewExam;
