import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css"; // For custom styles
import OresightLogo from "../assets/OresightLogo.png"

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (
        <div className="landing-page">
            <div className="content">
                <img 
                    src={OresightLogo}
                    alt="Logo" 
                    className="logo" 
                />
                <p className="message">Data Insights powered by <strong>GenAI</strong></p>
                <button className="get-started-btn" onClick={handleGetStarted}>
                    Let's Get Started
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
