import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css"; 
import OresightLogo from "../assets/OresightLogo.png"
import OresightLogoBlack from "../assets/OresightLogoBlack.png"

import { useUser } from "../context/UserContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const { setUserEmail } = useUser(); // Use the context
    const navigate = useNavigate();

    const handleSignIn = () => {
        console.log("Captured Email:", email);
        setUserEmail(email); 
        navigate("/home"); 
    };

    const handleToggle = () => {
        // Toggle the password visibility type and the icon
        setType(type === "password" ? "text" : "password");
        setIcon(type === "password" ? "bx:bx-eye-off" : "bx:bx-eye"); // Change icon when toggling
    };

    return (
        <div className="login-page">
            <div className="left-pane">
                <img src={OresightLogo} alt="Logo" className="logo" />
                <p className="message">Data Insights powered by <strong>GenAI</strong></p>
            </div>
            
            <div className="right-pane">
            <img src={OresightLogoBlack} alt="Logo" className="loginLogo" />
                <div className="form-container">
                    <form>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="password-container">
                            <input
                                type={type}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                           
                            
                        </div>
                        <div className="form-buttons">
                            <div className="form-links">
                                <a href="#"><u>Trouble signing in?</u></a>
                            </div>
                            <button type="button" className="sign-in-btn" onClick={handleSignIn}>
                                Sign In
                            </button>
                        </div>
                        
                    </form>
                    
                </div>
                <div className="sign-up">
                    <Link to ="/signup">Sign up</Link>
                    
                </div>
                
            </div>
        </div>
    );
};

export default LoginPage;
