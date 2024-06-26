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
            setTitle("");
            setCategory("");
            setContent("");
            //lets reset the forms after the data is inserted
        }
    };

    return (
        // This is the HTML that will be rendered on the page. It is a combination of JSX and HTML
        <form id="new-post-form" onSubmit={handleCreate}>
            <div>
                <input
                    className="form-input"
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    className="form-input"
                    type="text"
                    name="category"
                    value={category}
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <div>
                <textarea
                    className="form-input content-input"
                    type="text"
                    name="content"
                    value={content}
                    placeholder="Content"
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button id="button-pop" type="submit">
                SUBMIT
            </button>
        </form>
    );
};

export default Form;
