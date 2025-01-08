import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const WritingStyleProfile = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = 123;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const response = await fetch(`http://localhost:5000/api/profile/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
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
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {profile}
        </Typography>
      )}
    </Box>
  );
};

export default WritingStyleProfile;
