import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useNavigate } from "react-router-dom";
//import NightlightIcon from "@mui/icons-material/Nightlight";

const HomePage = () => {
  const navigate = useNavigate();

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
          position: "relative",
          display: "flex",
          flexDirection: "column",
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
              {/* You can toggle to <NightlightIcon /> for dark mode */}
            </IconButton>
            <IconButton onClick={() => navigate("/login")}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Background Icon */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            opacity: 0.1,
            fontSize: "300px",
          }}
        >
          🎓
        </Box>

        {/* Main Input */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flexGrow: 1,
            position: "relative",
          }}
        >
          <Box sx={{ position: "relative", zIndex: 2, width: "400px" }}>
            <TextField
              fullWidth
              placeholder="What’s on your mind?"
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
              }}
            />
            <Button
              variant="contained"
              sx={{
                marginTop: "10px",
                width: "100%",
                backgroundColor: "#3f51b5",
                color: "#fff",
                borderRadius: "20px",
                textTransform: "none",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
