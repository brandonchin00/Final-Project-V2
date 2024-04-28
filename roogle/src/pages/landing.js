import React from "react";
import "./landing.css";
import { supabase } from "../components/client.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();
    //useNavigate is a hook that returns a navigate function that you can use to navigate through the routes. It is provided by react-router-dom

    const handleSignIn = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: event.target.username.value,
            password: event.target.password.value,
        });
        // supabase.auth.signInWithPassword is a function that signs in a user with an email and password. It is provided by supabase documentation

        console.log(data);

        if (error) {
            alert("Error signing in:", error.message);
        } else {
            navigate("/dashboard");
            console.log("Signed in successfully:", data);
            //testing purposes console.log
        }
    };

    return (
        <div>
            <h1 id="logo">Roogle</h1>
            <div className="login-container">
                <div className="login-title-container">
                    <h2 id="title-sign-in">Sign In</h2>
                    <p id="subtitle-sign-in">
                        Rate, Categorize, and Save Your Items Digitally
                    </p>
                </div>
                <form
                    className="form-container"
                    onSubmit={handleSignIn}
                    autoComplete="off"
                >
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                    ></input>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    ></input>
                    <a href="www" id="forget-button">
                        Forgot Password?
                    </a>
                    <button id="sign-in-button" type="submit">
                        Sign In
                    </button>
                    <p id="or-block">or</p>
                </form>
                <Link to="/register">
                    <button id="register-button">Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Landing;
