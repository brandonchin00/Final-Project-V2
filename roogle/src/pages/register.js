import React from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { supabase } from "../components/client.js";

const handleSignUp = async (event) => {
    // Function to handle the sign up process, async function that takes in an event, which is the form submission event, and prevents the default action
    // You want to use async and await becuase you're waiting a reponse from supabase. If you don't the element will render without the data and return an error to the user
    event.preventDefault();

    // supabase.auth.signUp is a function that signs up a user with an email and password. It is provided by supabase documentation
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
        alert("Signed up successfully! Please sign in to continue.");
    }
};

const Register = () => {
    // Register Page Component, renders the HTML elements for the Register Page
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
                    onSubmit={handleSignUp} // Calls the handleSignUp function when the form is submitted
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
                        onSubmit={handleSignUp} // Calls the handleSignUp function when the button is clicked
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
