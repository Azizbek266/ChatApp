import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [err, setErr] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;

        try {
            await sendPasswordResetEmail(auth, email);
            setEmailSent(true);
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <section>
            <div class="form-box card">
                <div class="form-value ">
                    <h2>Parolni Tiklash</h2>
                    {emailSent ? (
                        <p>Reset password link has been sent to your email.</p>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div class="inputbox">
                                <ion-icon name="mail"></ion-icon>
                                <input type="email" required />
                                <label for="">Elektron Pochtangiz</label>
                            </div>
                            <button className="button">Reset Password</button>
                            {err && <span style={{ color: "red" }}>Failed to send reset password email!</span>}
                        </form>
                    )}
                    <p className="register">
                        Go back to <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
