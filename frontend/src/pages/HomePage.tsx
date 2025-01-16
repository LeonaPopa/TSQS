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
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { Conversation } from "../interfaces/conversation.interface";

const HomePage = () => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  const currentConversation = conversations.find(
    (c) => c.id === selectedConversationId,
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now(),
      title: `CHAT ${conversations.length + 1}`,
      messages: [],
    };
    setConversations((prev) => [...prev, newConversation]);
    setSelectedConversationId(newConversation.id);
    setInputText("");
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert("Please write something.");
      return;
    }

    let currentId = selectedConversationId;
    if (!currentId) {
      const newConversation: Conversation = {
        id: Date.now(),
        title: `CHAT ${conversations.length + 1}`,
        messages: [],
      };
      setConversations((prev) => [...prev, newConversation]);
      setSelectedConversationId(newConversation.id);
      currentId = newConversation.id;
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === currentId) {
          return {
            ...conv,
            messages: [...conv.messages, { sender: "user", text: inputText }],
          };
        }
        return conv;
      }),
    );

    setInputText("");

    try {
      const response = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: inputText }),
      });

      const data = await response.json();
      const openAiReply = data.text || "No response received.";

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === currentId) {
            return {
              ...conv,
              messages: [
                ...conv.messages,
                { sender: "openai", text: openAiReply },
              ],
            };
          }
          return conv;
        }),
      );
    } catch (error) {
      console.error("Error calling backend API:", error);
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === currentId) {
            return {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  sender: "openai",
                  text: "An error occurred while generating the response.",
                },
              ],
            };
          }
          return conv;
        }),
      );
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
          width: isCollapsed ? "60px" : "250px",
          backgroundColor: "#023047",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "width 0.3s ease",
          padding: isCollapsed ? "10px" : "20px",
        }}
      >
        {/* Toggle Button */}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{
            alignSelf: isCollapsed ? "center" : "flex-end",
          }}
        >
          <MenuIcon sx={{ color: "#fff" }} />
        </IconButton>

        {/* Logo / Title (hidden if collapsed) */}
        {!isCollapsed && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              marginTop: "10px",
              color: "#fff",
            }}
          >
            StylifyAI
          </Typography>
        )}

        <Box
          sx={{
            display: isCollapsed ? "none" : "block",
            marginBottom: "10px",
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={handleNewChat}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              cursor: "pointer",
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
              cursor: "pointer",
              display: isCollapsed ? "none" : "block",
            }}
          >
            🗂️ Learning Paths
          </Typography>
        </NavLink>

        {/* Conversation List */}
        <Box sx={{ marginTop: "20px" }}>
          {conversations.map((conv) => (
            <Button
              key={conv.id}
              disableRipple
              onClick={() => setSelectedConversationId(conv.id)}
              sx={{
                display: "block",
                width: "100%",
                textAlign: "left",
                justifyContent: isCollapsed ? "center" : "flex-start",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                ...(selectedConversationId === conv.id &&
                  !isCollapsed && {
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
                {conv.title}
              </Typography>
            </Button>
          ))}
        </Box>

        {/* User Profile Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            cursor: "pointer",
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

          {!isCollapsed && (
            <Box
              sx={{
                width: "200px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#fff" }}
              >
                User
              </Typography>
              <IconButton>
                <LogoutIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          )}
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

        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            marginBottom: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "100px",
          }}
        >
          {currentConversation?.messages.map((message, index) =>
            message.sender === "user" ? (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "#023047",
                    marginRight: "10px",
                    color: "#fff",
                  }}
                >
                  U
                </Avatar>
                <Paper
                  sx={{
                    padding: "10px 15px",
                    maxWidth: "60%",
                    backgroundColor: "#219ebc",
                    color: "#fff",
                    borderRadius: "10px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {message.text}
                </Paper>
              </Box>
            ) : (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "#ffb703",
                    marginRight: "10px",
                    color: "#000",
                  }}
                >
                  AI
                </Avatar>
                <Paper
                  sx={{
                    padding: "10px 15px",
                    maxWidth: "60%",
                    backgroundColor: "#e0e0e0",
                    color: "#000",
                    borderRadius: "10px",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {message.text}
                </Paper>
              </Box>
            ),
          )}
        </Box>

        {/* Input Field */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            margin: "25px",
          }}
        >
          <TextField
            sx={{
              width: "1000px",
            }}
            multiline
            maxRows={3}
            placeholder="Type your message..."
            variant="outlined"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            sx={{
              backgroundColor: "#023047",
              color: "#fff",
              textTransform: "none",
              width: "100px",
              height: "50px",
              fontSize: "17px",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
