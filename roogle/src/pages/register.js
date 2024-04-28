import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { supabase } from "../components/client.js";

const handleSignUp = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
        email: event.target.email.value,
        password: event.target.password.value,
        options: {
            data: {
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
            },
        },
    });

    if (error) {
        console.error("Error signing up:", error.message);
    } else {
        console.log("Signed up successfully:", data);
    }
};

const Register = () => {
    return (
        <div>
            <h1 id="logo">Roogle</h1>
            <div className="register-container">
                <div className="register-title-container">
                    <h2 id="title-sign-in">Register</h2>
                    <p id="subtitle-sign-in">
                        Build Your Own Digital Collection of Ratings Today
                    </p>
                </div>
                <form
                    className="form-container"
                    onSubmit={handleSignUp}
                    autoComplete="off"
                >
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        required
                    ></input>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        required
                    ></input>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        required
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    ></input>
                    <button
                        id="sign-in-button"
                        type="submit"
                        onSubmit={handleSignUp}
                    >
                        Register
                    </button>
                    <div className="sign-in-block">
                        <p id="account-p">Have an account?</p>
                        <Link to="/">
                            <button id="account-a">Sign In</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
