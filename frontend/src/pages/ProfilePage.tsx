import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Avatar,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const WritingStyleProfile = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = 123;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/profile/${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await response.json();
        setProfile(data.profile);
      } catch (error) {
        console.error("Error fetching writing style profile:", error);
        setProfile("Failed to fetch profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "0",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "1000px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "150px",
            background:
              "linear-gradient(90deg,rgb(79, 95, 202) 0%,rgb(175, 112, 243) 100%)",
          }}
        ></Box>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ padding: "20px 40px", width: "100%" }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: "-60px auto 20px auto",
                backgroundColor: "#3f51b5",
                fontSize: "3rem",
              }}
            >
              M
            </Avatar>

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign: "center",
                color: "#333",
              }}
            >
              {profile}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Mihnea
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                width: "90%",
                margin: "50px",
              }}
            >
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value="John Doe"
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value="johndoe@example.com"
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                value="+123 456 7890"
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value="123 Main Street, Cityville"
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="About"
                multiline
                rows={4}
                variant="outlined"
                value="A passionate writer with a knack for storytelling and creating engaging content."
                InputProps={{ readOnly: true }}
              />
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{
                  backgroundColor: "#3f51b5",
                  color: "#fff",
                  textTransform: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginTop: "20px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  ":hover": {
                    backgroundColor: "#303f9f",
                  },
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WritingStyleProfile;
