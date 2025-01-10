import { Box, Typography, Button, LinearProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

const LearningPathsPage = () => {
  const paths = [
    {
      title: "Grammar",
      lessons: "5/10 lessons",
      progress: 50,
    },
    {
      title: "Academic writing",
      lessons: "5/10 lessons",
      progress: 50,
    },
    {
      title: "Technical writing",
      lessons: "5/10 lessons",
      progress: 50,
    },
    {
      title: "Logical structuring",
      lessons: "5/10 lessons",
      progress: 50,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "40px",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          width: "100%",
          maxWidth: "1200px",
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
                  backgroundColor: "#3f51b5",
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
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  textTransform: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  ":hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Start learning
              </Button>
            </NavLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LearningPathsPage;
