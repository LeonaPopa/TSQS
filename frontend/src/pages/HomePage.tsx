import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Avatar,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: "user" | "openai";
  text: string;
}

const HomePage = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert("Please write something.");
      return;
    }

    setMessages((prevMessages) => [...prevMessages, { sender: "user", text: inputText }]);
    setInputText("");

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      });

      const data = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "openai", text: data.text || "No response received." },
      ]);
    } catch (error) {
      console.error("Error calling backend API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "openai", text: "An error occurred while generating the response." },
      ]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#fff",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            StylifyAI
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#555", cursor: "pointer", marginBottom: "10px" }}
          >
            ✨ New Chat
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", cursor: "pointer" }}>
            🗂️ Learning paths
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <Avatar sx={{ backgroundColor: "#3f51b5", marginRight: "10px" }}>
            M
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Mihnea Seitoaru
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {/* Top Navigation */}
        <AppBar
          position="static"
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            padding: "10px 20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Toolbar disableGutters sx={{ gap: 2 }}>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton>
              <WbSunnyIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/profile")}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  padding: "10px 15px",
                  maxWidth: "60%",
                  backgroundColor: message.sender === "user" ? "#3f51b5" : "#e0e0e0",
                  color: message.sender === "user" ? "#fff" : "#000",
                  borderRadius: "10px",
                }}
              >
                {message.text}
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input Field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderTop: "1px solid #ddd",
            paddingTop: "10px",
          }}
        >
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            value={inputText}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#3f51b5",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
