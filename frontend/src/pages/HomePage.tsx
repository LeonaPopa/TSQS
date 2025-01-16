import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/${userId}`);
        const data = await response.json();
        setChats(data);
        if (data.length > 0) {
          setActiveChatId(data[0].id); // Set the first chat as active by default
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
    <Box display="flex" height="100vh">
      {/* Sidebar for Chat List */}
      <Box
        width="250px"
        p={2}
        bgcolor="#f4f4f4"
        display="flex"
        flexDirection="column"
        borderRight="1px solid #ddd"
      >
        <IconButton onClick={() => navigate("/profile")}>
          <AccountCircleIcon />
        </IconButton>
        <NavLink to={"/learning-paths"} style={{ textDecoration: "none" }}>
          <Typography variant="h5" mb={2}>
            Learning paths
          </Typography>
        </NavLink>
        <Typography variant="h6" mb={2}>
          Chats
        </Typography>
        <List>
          {chats.map((chat) => (
            <ListItem
              button
              key={chat.id}
              selected={chat.id === activeChatId}
              onClick={() => setActiveChatId(chat.id)}
            >
              <ListItemText primary={`Chat ${chat.id}`} />
            </ListItem>
          ))}
        </List>
        
        <Button variant="contained" color="primary" onClick={createNewChat}>
          New Chat
        </Button>
        
      </Box>

      {/* Main Chat Window */}
      <Box flex="1" display="flex" flexDirection="column" p={2}>
        <Typography variant="h5" mb={2}>
          {activeChatId ? `Chat: ${activeChatId}` : "Select a chat to start"}
        </Typography>

        {/* Messages */}
        <Box flex="1" overflow="auto" mb={2}>
          {activeChat?.messages.map((message, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                mb: 1,
                alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                bgcolor: message.sender === "user" ? "#3f51b5" : "#e0e0e0",
                color: message.sender === "user" ? "#fff" : "#000",
              }}
            >
              {message.text}
            </Paper>
          ))}
        </Box>

        {/* Input Field */}
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
          />
          <Button variant="contained" color="primary" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
