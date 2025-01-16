import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Avatar } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { NavLink } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<{
    [key: string]: number;
  } | null>(null);
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
        const profileJson = JSON.parse(data.profile);
        setProfileData(profileJson);
      } catch (error) {
        console.error("Error fetching writing style profile:", error);
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const chartData = profileData
    ? {
        labels: Object.keys(profileData),
        datasets: [
          {
            label: "Writing Style Percentages",
            data: Object.values(profileData),
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
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
            background: "linear-gradient(90deg, #023047 0%, #219ebc 100%)",
          }}
        ></Box>

        <Box sx={{ padding: "20px 40px", width: "100%" }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              margin: "-60px auto 20px auto",
              backgroundColor: "#8ecae6",
              fontSize: "3rem",
            }}
          >
            U
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
            User
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {loading ? (
              <CircularProgress />
            ) : chartData ? (
              <Box
                sx={{
                  marginTop: "30px",
                  width: "100%",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                      },
                    },
                  }}
                />
              </Box>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  color: "#999",
                }}
              >
                No data available.
              </Typography>
            )}
          </Box>
        </Box>
        <NavLink to={"/"} style={{ textDecoration: "none", color: "#219ebc" }}>
          Go Back
        </NavLink>
      </Box>
    </Box>
  );
};

export default ProfilePage;
