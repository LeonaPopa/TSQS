import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LessonPage = () => {
  const lesson = {
    title: "Introduction to Grammar",
    content:
      "In this lesson, we will cover the basics of grammar, including the definition of grammar, its importance in communication, and the fundamental elements such as parts of speech, sentence structure, and punctuation. By understanding these concepts, you will be better equipped to create clear and effective sentences.",
    additionalInfo: [
      "Grammar is the system and structure of a language, consisting of syntax, morphology, and semantics.",
      "Understanding parts of speech (nouns, verbs, adjectives, etc.) is crucial for constructing proper sentences.",
      "Correct punctuation enhances clarity and ensures the intended meaning is conveyed.",
      "Mastering grammar improves both written and spoken communication skills.",
    ],
  };

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9f9",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          backgroundColor: "#023047",
          color: "#fff",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          StylifyAI Lessons
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#219ebc",
            textTransform: "none",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/course")}
        >
          Back to Course
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {/* Video Section */}
        <Box
          sx={{
            flex: 2,
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRight: "4px solid #219ebc",
            overflow: "hidden",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/O-6q-siuMik"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Lesson Content Section */}
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            padding: "40px",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#023047",
              marginBottom: "20px",
            }}
          >
            {lesson.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#555",
              textAlign: "justify",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            {lesson.content}
          </Typography>

          {/* Additional Text Explanations */}
          <Box sx={{ marginBottom: "30px" }}>
            {lesson.additionalInfo.map((info, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  color: "#555",
                  marginBottom: "10px",
                  lineHeight: "1.6",
                }}
              >
                {`• ${info}`}
              </Typography>
            ))}
          </Box>

          {/* Mark as Complete Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#023047",
              color: "#fff",
              textTransform: "none",
              padding: "15px 30px",
              borderRadius: "10px",
              fontSize: "1rem",
              alignSelf: "flex-start",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => navigate("/course")}
          >
            Mark as Complete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonPage;
