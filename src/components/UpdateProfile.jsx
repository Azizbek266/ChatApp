import React, { useState } from "react";
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const ProfileUpdate = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (displayName) {
        await updateProfile(user, {
          displayName,
        });
      }

      if (file) {
        const storageRef = ref(storage, `${user.displayName}_${Date.now()}`);
        const photoURL = await uploadAndGetDownloadURL(storageRef, file);
        await updateProfile(user, {
          photoURL,
        });
      }

      if (password && newPassword) {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName || user.displayName,
        email: user.email,
        password,
        photoURL: user.photoURL,
      });

      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };

  const uploadAndGetDownloadURL = (storageRef, file) => {
    return new Promise((resolve, reject) => {
      uploadBytesResumable(storageRef, file)
        .then(() => getDownloadURL(storageRef))
        .then((downloadURL) => resolve(downloadURL))
        .catch((error) => reject(error));
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <section>
      <div className="form-box card">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Profile Update</h2>
            <div className="inputbox">
              <ion-icon name="person"></ion-icon>
              <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              <label>Display Name</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed"></ion-icon>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <label>New Password</label>
            </div>
            <div className="inputbox" >
              <input type="file" accept="image/*" onChange={handleFileChange} style={{marginTop:"13px"}}/>
              <label>Profile Picture</label>
            </div>
            <button className="button" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <div className="register">
              <p style={{ color: "red" }}>{err && <span>Error occurred while updating!</span>}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileUpdate;
