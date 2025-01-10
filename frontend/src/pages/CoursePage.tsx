import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { NavLink } from "react-router-dom";

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
                <PlayArrowIcon sx={{ height: "30px", width: "30px" }} />
              </NavLink>
            </ListItem>
          ))}
        </List>

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
        >
          Start Course
        </Button>
      </Box>
    </Box>
  );
};

export default CoursePage;
