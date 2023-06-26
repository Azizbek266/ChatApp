import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./components/styles/style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import UpdateProfile from "./pages/UpdateProfile";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to = "/login" / > ;
        }

        return children
    };

    return ( <
        BrowserRouter >
        <
        Routes >
        <
        Route path = "/" >
        <
        Route index element = { <
            ProtectedRoute >
            <
            Home / >
            <
            /ProtectedRoute>
        }
        /> <
        Route path = "login"
        element = { < Login / > }
        /> <
        Route path = "register"
        element = { < Register / > }
        /> <
        Route path = "update-profile"
        element = { < UpdateProfile / > }
        /> <
        Route path = "/forgot-password"
        element = { < ForgotPassword / > }
        /> < /
        Route > <
        /Routes> < /
        BrowserRouter >
    );
}

export default App;