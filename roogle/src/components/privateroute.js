import { Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { supabase } from "../components/client.js";

const {
    data: { user },
} = await supabase.auth.getUser();

console.log(user);

const PrivateRoutes = () => {
    let auth = { token: user };
    return auth.token ? <Dashboard /> : <Navigate to="/" />;
};

export default PrivateRoutes;
