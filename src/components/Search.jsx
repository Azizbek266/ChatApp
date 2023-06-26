import React, { useContext, useState } from "react";
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc, orderBy } from "firebase/firestore";
import Searchh from "../img/search.png";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    if (username.length >= 1) {
      const q = query(
        collection(db, "users"),
        where("displayName", ">=", username.toLowerCase()),
        where("displayName", "<=", username.toLowerCase() + "\uf8ff"),
        orderBy("displayName")
      ); 
  
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const foundUsers = [];
          querySnapshot.forEach((doc) => {
            foundUsers.push(doc.data());
          });
          setUsers(foundUsers);
          setErr(false); 
          setShowResults(true); 
        } else {
          setUsers([]);
          setErr(true); 
          setShowResults(true); 
        }
      } catch (err) {
        setErr(true);
        setShowResults(true); 
      }
    } else {
      setUsers([]);
      setErr(false);
      setShowResults(false); 
    }
  };
  

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (selectedUser) => {
    const combinedId =
      currentUser.uid > selectedUser.uid
        ? currentUser.uid + selectedUser.uid
        : selectedUser.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUsers([]);
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Qidiruv..."
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={handleSearch}>
          <img src={Searchh} alt="" />
        </button>
      </div>
      {err && <span className="error-text">Not found</span>}
      {showResults && (
          <div className="searchResults">
            {users.map((user) => (
              <div
                className="userChat"
                key={user.uid}
                onClick={() => handleSelect(user)}
              >
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{user.displayName}</span>
                </div>
              </div>
            ))} 
          </div>
        )}
    </div>
  );
};

export default Search;
