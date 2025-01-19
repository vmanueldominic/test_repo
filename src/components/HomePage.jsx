import React, { useState,useEffect  } from "react";
import Sidebar from "../components/Sidebar";
import OreCard from "./OreCard";
import "../styles/HomePage.css";

import { FaRedo } from "react-icons/fa";
import { useUser } from "../context/UserContext";

const HomePage = () => {
    // const API_BASE_URL = "https://oresight-proxy-server.azurewebsites.net";  // Direct Databricks URL

    // const { userEmail } = useUser();
    // const userName = userEmail?.split("@")[0] || "User";

    const [textFieldContent, setTextFieldContent] = useState("");
    // useEffect(() => {
    //     console.log("API Base URL:", API_BASE_URL);
    // }, []);

    const questions = [
        "What is the average equipment downtime for floatation equipment during maintenance?",
        "What is the average silica concentration?",
        "What is the average pH range of the reagents used in floatation?",
        "What is the relationship Silica and Iron?",
    ];

    const onCardClick = async (question) => {
        const payload = {
            messages: [
                {
                    role: "user",
                    content: String(question),
                },
            ],
        };

        try {

            const response = await fetch(
                // `${API_BASE_URL}/serving-endpoints/agents_modern_data_platform_ai-flotation_plant_dev-llm_mining_u/invocations`,
                "/api/serving-endpoints/agents_modern_data_platform_ai-flotation_plant_dev-llm_mining_u/invocations",
                {
                    method: "POST",
                    headers: {
                        // "Access-Control-Allow-Origin":  "*",
                        // "Access-Control-Allow-Headers":  "Content-Type",
                        "Content-Type": "application/json",
                        "Authorization": import.meta.env.VITE_AUTHORIZATION_KEY // Make sure not to expose this directly
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!response.ok) {
                let errorDetails = null;
                try {
                    errorDetails = await response.json();
                } catch {
                    console.error("Failed to parse error response as JSON.");
                }

                console.error("HTTP Error:", {
                    status: response.status,
                    statusText: response.statusText,
                    details: errorDetails,
                });

                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
            }

            const result = await response.json();
            const content = extractContentValue(result);

            setTextFieldContent(content || "No valid <tool_call_result> content found.");
        } catch (error) {
            console.error("Error:", error);
            setTextFieldContent("An error occurred while fetching the response.");
        }
    };
    
    /**
     * Extract the content within <tool_call_result> from the response.
     */
    const extractContentValue = (result) => {
        try {
            // Navigate to the message content
            const messageContent = result.choices?.[0]?.message?.content || "";
    
            // Match the <tool_call_result> block
            const toolCallResultMatch = messageContent.match(/<tool_call_result>([\s\S]*?)<\/tool_call_result>/);
    
            if (toolCallResultMatch) {
                
                const parsedContent = JSON.parse(toolCallResultMatch[1]);
                console.log("PARSED", parsedContent)
    
                
                const csvContent = JSON.parse(parsedContent.content) || "";
                console.log("csvContent",csvContent)
                
                if (csvContent.format === "CSV") {
                    
                    console.log(typeof(csvContent));
                    console.log(csvContent.value);
                    
                    return formatCSV(csvContent.value);
                }
    
                return csvContent; // Return raw content if not CSV
            }
        } catch (error) {
            console.error("Error extracting content:", error);
        }
    
        return "No valid data found.";
    };
    
    const formatCSV = (csvData) => {
        try {
            const rows = csvData.split("\n").filter((row) => row.trim() !== "");
            const headers = rows[0].split(",").map((header) => header.trim());
            const maxColumnWidths = headers.map((header, index) => {
                return Math.max(header.length, ...rows.slice(1).map((row) => row.split(",")[index].trim().length));
            });
    
            let tableOutput = headers.map((header, index) => header.padEnd(maxColumnWidths[index])).join(" | ") + "\n";
            tableOutput += "-".repeat(tableOutput.length) + "\n";
    
            rows.slice(1).forEach((row) => {
                const values = row.split(",").map((value) => value.trim());
                tableOutput += values.map((value, index) => value.padEnd(maxColumnWidths[index])).join(" | ") + "\n";
            });
    
            return tableOutput;
        } catch (error) {
            console.error("Error formatting CSV with dynamic widths:", error);
            return "Error formatting CSV data.";
        }
    };
    

    return (
        <div className="home-page">
            <Sidebar />
            <div className="main-content">
                <header>
                    <h1 className="header-1">
                        Hi There, USER!
                        {/* {userName.charAt(0).toUpperCase() + userName.slice(1)}! */}
                    </h1>
                    <h1 className="header-2">What would you like to know today?</h1>
                    <p>
                        Here are some common items to start your session, <br />
                        but you can also write your own.
                    </p>
                </header>
                <div className="card-container">
                    {questions.map((question, index) => (
                        <OreCard key={index} question={question} onCardClick={onCardClick} />
                    ))}
                </div>
                <button className="refresh-button">
                    <FaRedo size={14} />
                </button>
                <span className="refresh-text">Refresh</span>

                <textarea
                    className="text-field"
                    placeholder="Write something here..."
                    maxLength="200"
                    value={textFieldContent} // Controlled by state
                    onChange={(e) => setTextFieldContent(e.target.value)} // Allow manual edits
                ></textarea>
            </div>
        </div>
    );
};

export default HomePage;
