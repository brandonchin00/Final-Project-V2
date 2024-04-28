import React, { useState } from "react";
import "./popup.css";
import { supabase } from "../components/client.js";

const Form = ({ parentCallback }) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    //<Form parentCallback={forceReloadPosts} />
    //Call back function to reload posts after new post is created when the form is submitted

    const handleCreate = async (event) => {
        event.preventDefault(); // Prevent default form submission

        parentCallback();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        let card_id = user.id;

        const { error } = await supabase
            .from("notes")
            .insert({ card_id, title, category, content });

        if (error) {
            console.error("Error inserting data:", error.message);
        } else {
            console.log("Data inserted successfully");
            // Optionally, you can reset the form fields after successful submission
            setTitle("");
            setCategory("");
            setContent("");
        }
    };

    return (
        <form id="new-post-form" onSubmit={handleCreate}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Content:</label>
                <input
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
