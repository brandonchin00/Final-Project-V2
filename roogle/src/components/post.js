import React from "react";
import "./post.css";
import { supabase } from "../components/client.js";

const Post = (props) => {
    const handleDelete = async () => {
        try {
            const { error } = await supabase
                .from("notes")
                .delete()
                .eq("id", props.id);

            console.log(props.id);

            if (error) {
                throw error;
            } else {
                props.parentCallback();
            }

            console.log("Data deleted successfully");
        } catch (error) {
            console.error("Error deleting data:", error.message);
        }
    };

    return (
        <div className="post-container">
            <div className="content-title-container">
                <h2>{props.title ? props.title : "Loading..."}</h2>
            </div>
            <div className="content-category-container">
                <h3>{props.category ? props.category : "Loading..."}</h3>
            </div>
            <div className="content-content-container">
                <p>{props.content ? props.content : "Loading..."}</p>
            </div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Post;
