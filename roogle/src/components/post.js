import React from "react";
import "./post.css";
import { supabase } from "../components/client.js";

const Post = (props) => {
    const handleDelete = async () => {
        try {
            const { error } = await supabase ///supabase documentation for deleting data
                .from("notes")
                .delete()
                .eq("id", props.id);

            console.log(props.id);

            if (error) {
                throw error;
            } else {
                props.parentCallback(); //callback function to reload posts after a post is deleted
            }

            console.log("Data deleted successfully");
        } catch (error) {
            console.error("Error deleting data:", error.message);
        }
    };

    return (
        //if props.title is not loaded, display loading
        <div className="post-container">
            <div>
                <div className="content-title-container">
                    <h2 id="content-title">
                        {props.title ? props.title : "Loading..."}
                    </h2>
                </div>
                <div className="content-category-container">
                    <h3 id="content-category">
                        {props.category ? props.category : "Loading..."}
                    </h3>
                </div>
                <div className="content-content-container">
                    <p id="content-content">
                        {props.content ? props.content : "Loading..."}
                    </p>
                </div>
            </div>
            <button id="delete-button" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};

export default Post;
