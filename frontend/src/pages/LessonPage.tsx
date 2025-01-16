import { Box, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LessonPage = () => {
  const lesson = {
    title: "Introduction to Grammar",
    content:
      "In this lesson, we will cover the basics of grammar, including the definition of grammar, its importance in communication, and the fundamental elements such as parts of speech, sentence structure, and punctuation. By understanding these concepts, you will be better equipped to create clear and effective sentences.",
    videoUrl: "https://example.com/lesson-video.mp4",
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          {lesson.title}
        </Typography>

        <Divider sx={{ marginBottom: "20px" }} />

        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            color: "#555",
            textAlign: "justify",
          }}
        >
          {lesson.content}
        </Typography>

        <Box
          sx={{
            marginBottom: "20px",
            width: "100%",
            height: "300px",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: "1.2rem" }}>
            Video Placeholder (Video URL: {lesson.videoUrl})
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3f51b5",
            color: "#fff",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            ":hover": {
              backgroundColor: "#303f9f",
            },
          }}
          onClick={() => navigate("/course")}
        >
          Mark as Complete
        </Button>
      </Box>
    </Box>
  );
};

export default LessonPage;
