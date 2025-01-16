import React, { useState, useEffect } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";

interface Message {
  sender: "user" | "openai";
  text: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

const HomePage = () => {
  const navigate = useNavigate();

  const userId = "123"; // Static user ID for now
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/${userId}`);
        const data = await response.json();
        setChats(data);
        if (data.length > 0) {
          setActiveChatId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const createNewChat = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chats/${userId}`, {
        method: "POST",
      });
      const newChat = await response.json();
      setChats((prev) => [...prev, newChat]);
      setActiveChatId(newChat.id);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !activeChatId) return;

    const message: Message = { sender: "user", text: inputText };

    // Update messages locally
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      )
    );
    setInputText("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/chats/${userId}/${activeChatId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const updatedChat = await response.json();
      setChats((prev) =>
        prev.map((chat) => (chat.id === activeChatId ? updatedChat : chat))
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

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
          width: isCollapsed ? "60px" : "250px",
          backgroundColor: "#023047",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "width 0.3s ease",
          padding: isCollapsed ? "10px" : "20px",
        }}
      >
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            alignSelf: isCollapsed ? "center" : "flex-end",
          }}
        >
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>

        {!isCollapsed && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#fff",
            }}
          >
            StylifyAI
          </Typography>
        )}

        <Box
          sx={{
            marginBottom: "10px",
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={createNewChat}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              display: isCollapsed ? "none" : "block",
            }}
          >
            ✨ New Chat
          </Typography>
        </Box>

        <NavLink
          to={"/learning-paths"}
          style={{
            textDecoration: "none",
            marginBottom: "10px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              display: isCollapsed ? "none" : "block",
            }}
          >
            🗂️ Learning Paths
          </Typography>
        </NavLink>

        <Box>
          {chats.map((chat) => (
            <Button
              key={chat.id}
              disableRipple
              onClick={() => setActiveChatId(chat.id)}
              sx={{
                textAlign: "left",
                justifyContent: isCollapsed ? "center" : "flex-start",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "4px",
                ...(activeChatId === chat.id && {
                  backgroundColor: "rgba(255,255,255,0.2)",
                  fontWeight: "bold",
                }),
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: isCollapsed ? "none" : "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Chat {chat.id}
              </Typography>
            </Button>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            marginTop: "auto",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          <NavLink to={"/profile"} style={{ textDecoration: "none" }}>
            <Avatar
              sx={{
                backgroundColor: "#fff",
                marginRight: isCollapsed ? 0 : "10px",
                color: "#219ebc",
              }}
            >
              U
            </Avatar>
          </NavLink>
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
          <Toolbar
            disableGutters
            sx={{
              gap: 2,
            }}
          >
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton onClick={() => navigate("/profile")}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
          }}
        >
          {activeChat?.messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                marginBottom: "10px",
              }}
            >
              <Paper
                sx={{
                  padding: "10px 15px",
                  maxWidth: "60%",
                  backgroundColor:
                    message.sender === "user" ? "#219ebc" : "#e0e0e0",
                  color: message.sender === "user" ? "#fff" : "#000",
                  borderRadius: "10px",
                  wordWrap: "break-word",
                }}
              >
                {message.text}
              </Paper>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <TextField
            multiline
            maxRows={3}
            placeholder="Type your message..."
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            sx={{
              backgroundColor: "#023047",
              color: "#fff",
            }}
            variant="contained"
            onClick={sendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
