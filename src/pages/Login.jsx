import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;  

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <section>
        <div class="form-box card">
            <div class="form-value ">
                <form onSubmit={handleSubmit}>
                    <h2>Kirish</h2>
                    <div class="inputbox">
                        <ion-icon name="mail"></ion-icon>
                        <input type="text" required />
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed" onclick="togglePasswordVisibility()"></ion-icon>
                        <input type="password" id="passwordInput" required />
                        <label for="">Password</label>
                    </div>
                    <button className="button">Kirish</button>
                    <div class="register">
                        <p>Sizda akkaunt yo'qmi? <a href="./register">Ro'yxatdan o'tish</a></p>
                    </div>
                    <div class="register">
                        <p><a href="#" onClick={handleForgotPassword}>Parolni tiklash!</a></p>
                    </div>  
                </form>
                {err && <span>Noto'g'ri to'ldirildi!</span>}
            </div>
        </div>
    </section>
  );
};

export default Login;
