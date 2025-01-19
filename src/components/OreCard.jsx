import { Card, CardContent, Typography } from "@mui/material";

const OreCard = ({ question, onCardClick }) => (
    <Card
        sx={{
            width: "100%",
            height: "120px",
            margin: "10px",
            borderRadius: "20px",
            backgroundColor: "#2E74C9",
            color: "#E7E7E7",
            cursor: "pointer",
        }}
        onClick={() => onCardClick(question)} // Trigger the callback with the question
    >
        <CardContent>
            <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 600, fontFamily: "Inter", fontSize: 15 }}
            >
                {question}
            </Typography>
        </CardContent>
    </Card>
);

export default OreCard;
