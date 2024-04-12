import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";


export const Classes = () => {

  const [classData, setClassData] = useState([]);

  const handleClassData = async (courseID) => {

      let something = [];
      const dbRef = ref(getDatabase());
      await get(child(dbRef, `classInfo`)).then((snapshot) => {
          if (snapshot.exists()) {
            something = snapshot.val();
            setClassData(something);
          } else {
           console.log("Error: no data found");
          }
      }).catch((error) => {
        console.error(error);
      });
    }

    return (
    <div>
     
      <h1>ExamJam</h1>
      <h2>Flashcards</h2>
      <div id="flashcardDisplay">
         <button onClick={handleClassData}>Click me</button>
      {classData.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                 
                    classData.map(something => (
                        <div key={something.classData}>
                          <p>something</p>
                        </div>
                    ))
                )}
      </div>
    </div>
  ); 

};

export default Classes;