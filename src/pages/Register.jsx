import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      let photoURL = "http://www.newdesignfile.com/postpic/2014/09/windows-user-icons-transparent_248595.jpg";

      if (file) {
        photoURL = await uploadAndGetDownloadURL(storageRef, file);
      }
 
      await updateProfile(res.user, {
        displayName,
        photoURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        password,
        photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
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
            <h2>Ro'yxatdan o'tish</h2>
            <div className="inputbox">
              <ion-icon name="person"></ion-icon>
              <input type="text" required />
              <label>Name</label>
            </div>
            <div className="inputbox">
              <ion-icon name="mail"></ion-icon>
              <input type="text" required />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed" onClick="togglePasswordVisibility()"></ion-icon>
              <input type="password" id="passwordInput" required />
              <label>Password</label>
            </div>
            <button className="button" disabled={loading}>
              {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
            </button>
            <div className="register">
              <p>
                Sizda akkaunt bormi? <Link to="/login">Kirish</Link>
              </p>
            </div>
            <div className="register">
              <p style={{ color: "green" }}></p>
            </div>
            <div className="register">
              <p style={{ color: "red" }}>{err && <span>Noto'g'ri to'ldirildi!</span>}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
