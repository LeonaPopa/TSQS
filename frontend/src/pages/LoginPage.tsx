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
import { NavLink, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        backgroundColor: "#f9f9f9", // Page background color
      }}
    >
      {/* Left Section - Login Form */}
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
            Sign in
          </Typography>
          {/* Username Field */}
          <TextField
            fullWidth
            label="User name"
            placeholder="Enter your user name"
            variant="outlined"
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
          {/* Remember Me and Forgot Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Link href="#" underline="hover" sx={{ fontSize: "0.9rem" }}>
              Forgot Password?
            </Link>
          </Box>
          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: 2,
              borderRadius: "8px",
            }}
          >
            Login
          </Button>
          {/* Register Link */}
          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don’t have an Account?{" "}
            <NavLink to="/register" color="primary">
              Register
            </NavLink>
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
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="img"
          src="https://media.istockphoto.com/id/1330902575/vector/back-to-school-concept.jpg?s=612x612&w=0&k=20&c=xrrrBt0WhLG1BRjCoUurBncbDmM-vnokQ83sPgVcX5Y="
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

export default LoginPage;
