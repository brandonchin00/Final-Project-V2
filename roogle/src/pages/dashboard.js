import React, { useEffect, useState } from "react";
import "./landing.css";
import "./dashboard.css";
import { supabase } from "../components/client.js";
import Post from "../components/post.js";
import Form from "../components/popup.js"; //should  not be using form becuase it is a reserved word in JS, but I will keep it for now
import { useNavigate } from "react-router-dom";

//useEffect --> Render after Async function. Async used with await to wait for the response from the server. If you don't use async and await, the element will render without the data and return an error to the user
const Dashboard = () => {
    const [name, setName] = useState("");
    const [posts, setPosts] = useState([]); // I use states to assess if a component needs to be rendered again to reflect the change in data
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);
    //if state change rerender it again

    async function fetchData() {
        const {
            data: { user },
        } = await supabase.auth.getUser(); //provided by supabase documentation, this pulls user auth data from table and returns it was user.{target_value}

        const returnData = await supabase
            .from("profile")
            .select("first_name")
            .eq("id", user.id);

        const returnData2 = await supabase
            .from("profile")
            .select("last_name")
            .eq("id", user.id); // let me explain this function. From profile table, select the first name where the id is equal to the user id. If you would like to see my supabase database please check README.md

        setName(
            returnData.data[0].first_name + " " + returnData2.data[0].last_name //lets append the first name and last name to display the full name
        );

        const returnData3 = await supabase
            .from("notes")
            .select("id, title, category, content")
            .eq("card_id", user.id); // let's pull some information from the notes table where the card_id is equal to the user id

        setPosts(returnData3.data);
    }

    async function signOut() {
        //signout function, using supabase.auth.signOut to sign out the user. Provided by documentation.
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log("Error logging out:", error.message);
        } else {
            alert("Logged out successfully"); //removes the token from local storage.
            navigate("/");
        }
    }

    return (
        // This is the HTML that will be rendered on the page. It is a combination of JSX and HTML
        <div className="dashboard-container">
            <div className="navbar-side">
                <div className="navbar-title-container">
                    <h1 className="navbar-title ">
                        {" "}
                        {name ? name : "Loading..."}
                    </h1>
                </div>
                <div className="navbar-items">
                    <div>
                        <h3 className="note-title">NEW NOTE:</h3>
                        <Form parentCallback={fetchData} />
                    </div>
                    <button id="button-signout" onClick={signOut}>
                        SIGN OUT
                    </button>
                </div>
            </div>
            {/* I love this function. Loops using map to render post by the data array provided from Post that is set by setPosts(returnData3.data) */}
            <div className="content-container">
                {posts.map((post, index) => (
                    <Post
                        key={index}
                        id={post.id}
                        title={post.title}
                        category={post.category}
                        content={post.content}
                        parentCallback={fetchData} //callback function to update the data, I put the function into the prop to pass it to the child component. We do this becuase we want to update the data after the user has added a new post
                    />
                ))}
            </div>
        </div>
    );
};
export default Dashboard;
