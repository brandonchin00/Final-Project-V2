import { Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { supabase } from "../components/client.js";

const {
    data: { user },
} = await supabase.auth.getUser(); //supabase documentation

console.log(user); // testing

const PrivateRoutes = () => {
    let auth = { token: user }; // auth token is user was CHAT GPT-3, and Supabase documentation. I could not figure it out D:
    return auth.token ? <Dashboard /> : <Navigate to="/" />;
};

export default PrivateRoutes;

//this is from protect routes documentation. I only replaced the variable and components.
