import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Card,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundColor: "#f9f9f9", // Page background color
      }}
    >
      {/* Left Section - Register Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: 4,
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Welcome!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#3f51b5",
              fontWeight: "bold",
              marginBottom: 3,
              textAlign: "center",
            }}
          >
            Register
          </Typography>
          {/* Full Name Field */}
          <TextField
            fullWidth
            label="Full Name"
            placeholder="Enter your full name"
            variant="outlined"
            sx={{
              marginBottom: 2,
            }}
          />
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            placeholder="Enter your email"
            variant="outlined"
            type="email"
            sx={{
              marginBottom: 2,
            }}
          />
          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            variant="outlined"
            sx={{
              marginBottom: 2,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Confirm Password Field */}
          <TextField
            fullWidth
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your Password"
            variant="outlined"
            sx={{
              marginBottom: 2,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Agree to Terms */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="I agree to the Terms and Conditions"
            />
          </Box>
          {/* Register Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: 2,
              borderRadius: "8px",
            }}
          >
            Register
          </Button>
          {/* Already have an account */}
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href="/login" underline="hover" color="primary">
              Login
            </Link>
          </Typography>
        </Card>
      </Grid>

      {/* Right Section - Illustration */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff", // Right section background
        }}
      >
        {/* You can replace this Box with an Image component */}
        <Box
          component="img"
          src="/path-to-your-illustration.png" // Replace with your image path
          alt="Illustration"
          sx={{
            maxWidth: "80%",
            height: "auto",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
