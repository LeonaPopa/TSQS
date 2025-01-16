import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink, useNavigate } from "react-router-dom";

const CoursePage = () => {
  const course = {
    title: "Grammar Fundamentals",
    description:
      "This course will teach you the basics of English grammar, including sentence structure, verb tenses, and punctuation. By the end of this course, you'll have a solid foundation to write and communicate effectively.",
    lessons: [
      { title: "Introduction to Grammar", duration: "10 min" },
      { title: "Parts of Speech", duration: "15 min" },
      { title: "Verb Tenses", duration: "20 min" },
      { title: "Punctuation Basics", duration: "12 min" },
      { title: "Common Grammar Mistakes", duration: "18 min" },
    ],
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
        minHeight: "100vh",
        backgroundImage:
          "url('https://www.pixelstalk.net/wp-content/uploads/2016/11/Education-Images-HD.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/learning-paths")}
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "#fff",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
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
          {course.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: "20px",
            color: "#555",
            textAlign: "center",
          }}
        >
          {course.description}
        </Typography>

        <Divider sx={{ marginBottom: "20px" }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Lessons
        </Typography>

        <List sx={{ marginBottom: "20px" }}>
          {course.lessons.map((lesson, index) => (
            <ListItem
              key={index}
              sx={{
                borderBottom: "1px solid #ddd",
                padding: "10px 0",
              }}
            >
              <ListItemText
                primary={lesson.title}
                secondary={lesson.duration}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
              <NavLink to={"/lesson"}>
                <PlayArrowIcon
                  sx={{ height: "30px", width: "30px", color: "#8ecae6" }}
                />
              </NavLink>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#023047",
            color: "#fff",
            textTransform: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => navigate("/lesson")}
        >
          Start Course
        </Button>
      </Box>
    </Box>
  );
};

export default CoursePage;
