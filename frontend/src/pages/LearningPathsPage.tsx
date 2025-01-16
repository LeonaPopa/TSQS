import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  AppBar,
  Toolbar,
  LinearProgress,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const LearningPathsPage = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();

  const paths = [
    {
      title: "Grammar",
      lessons: "5/10 lessons completed",
      progress: 50,
    },
    {
      title: "Academic writing",
      lessons: "0/10 lessons completed",
      progress: 0,
    },
    {
      title: "Technical writing",
      lessons: "10/10 lessons completed",
      progress: 100,
    },
    {
      title: "Logical structuring",
      lessons: "0/10 lessons completed",
      progress: 0,
    },
  ];

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
      {/* SIDEBAR */}
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

        {/* Logo / Title */}
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

        {/* "New Chat" */}
        {!isCollapsed && (
          <NavLink
            to={"/"}
            style={{
              marginBottom: "10px",
              cursor: "pointer",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            <Typography variant="body1">✨ Chat</Typography>
          </NavLink>
        )}

        <Typography
          variant="body1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            display: isCollapsed ? "none" : "block",
          }}
        >
          🗂️ Learning Paths
        </Typography>

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

      {/* MAIN CONTENT AREA */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {/* TOP NAV */}
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
            <IconButton onClick={() => navigate("/profile")}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* LEARNING PATHS CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "40px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {paths.map((path, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #ddd",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: "#333",
                  }}
                >
                  {path.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginBottom: "10px",
                    color: "#555",
                  }}
                >
                  {path.lessons}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={path.progress}
                  sx={{
                    height: "10px",
                    borderRadius: "5px",
                    marginBottom: "20px",
                    backgroundColor: "#f0f0f0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#219ebc",
                    },
                  }}
                />
                <NavLink
                  to={"/course"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#219ebc",
                      color: "#fff",
                      width: "160px",
                      textTransform: "none",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {path.progress === 0
                      ? "Start learning"
                      : "Continue learning"}
                  </Button>
                </NavLink>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LearningPathsPage;
