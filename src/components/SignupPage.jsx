import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/SignupPage.css"; 


import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'



import OresightLogo from "../assets/OresightLogo.png"
import OresightLogoBlack from "../assets/OresightLogoBlack.png"

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login"); 
    };
    const [password, setPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        // Toggle the password visibility type and the icon
        setType(type === "password" ? "text" : "password");
        setIcon(type === "password" ? "bx:bx-eye-off" : "bx:bx-eye"); // Change icon when toggling
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked); // Update state when checkbox is clicked
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
                        <div className="form-group">
                            <input
                                type="name"
                                id="name"
                                value={name}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="First & Last Name"
                                required
                            />
                        </div>
                        <div className="password-container">
                            <input
                                type={type}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Set a Password"
                                required
                            />
                           
                            
                        </div>
                        <div className="form-group">
                            <label className="agreementLabel">
                                <input
                                    type="checkbox"
                                    checked="false"
                                />
                                I agree with Pulse AI's <a href="#" target="_blank" rel="noopener noreferrer">Data Collection & Privacy Policy</a>.
                            </label>
                        </div>
                        <div className="form-buttons">
                            <div className="form-links">
                                <Link to="/login">Cancel</Link>
                            </div>
                            <button type="button" className="sign-in-btn" onClick={handleLogin}>
                                Sign up
                            </button>
                        </div>
                        
                    </form>
                    
                </div>
               
                
            </div>
        </div>
    );
};

export default SignupPage;
