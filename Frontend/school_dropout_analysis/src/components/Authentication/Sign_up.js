import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LockIcon from "@mui/icons-material/Lock";
import WorkIcon from "@mui/icons-material/Work";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Back from "../Images/Login.png";
import vector from "../Images/LoginVector.png";
import axios from "axios";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password: "",
    city: "",
    pincode: "",
    highestQualification: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register-user",
        formData
      );
      console.log(response.data);
      toast.success("Register Successfull");
      // Handle success or error responses here
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Error ");
      // Handle error
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Back})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <Typography component="h1" variant="h3" style={{ color: "white" }}>
            Welcome to Student Dropout Analysis Portal
          </Typography>

          <div>
            <img src={vector} alt="vector" width={500} />
          </div>
        </Grid>
        <Grid
          style={{ backgroundColor: "black" }}
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}
            {/* <Typography component="h1" variant="h5">
              Sign Up
            </Typography> */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="name"
                autoFocus
                value={formData.fullName}
                onChange={handleChange}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                InputProps={{
                  style: { color: "white" }, // Text color set to white
                  startAdornment: <WorkIcon style={{ color: "white" }} />, // Icon color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: <EmailIcon style={{ color: "white" }} />,
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobileNo"
                label="Mobile Number"
                name="mobileNo"
                autoComplete="tel"
                value={formData.mobileNo}
                onChange={handleChange}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: <PhoneIcon style={{ color: "white" }} />,
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: <LockIcon style={{ color: "white" }} />,
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="address-level2"
                value={formData.city}
                onChange={handleChange}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: (
                    <LocationCityIcon style={{ color: "white" }} />
                  ),
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="pincode"
                label="Pincode"
                name="pincode"
                autoComplete="postal-code"
                value={formData.pincode}
                onChange={handleChange}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: <LocationOnIcon style={{ color: "white" }} />,
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="highestQualification"
                label="Highest Qualification"
                name="highestQualification"
                autoComplete="education-level"
                value={formData.highestQualification}
                onChange={handleChange}
                InputProps={{
                  style: { color: "white" },
                  startAdornment: <SchoolIcon style={{ color: "white" }} />,
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Label color set to white
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Border color set to white
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Border color on hover set to white
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Border color when focused set to white
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link to="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link to="/login">{"Already have an account? Login "}</Link>
                </Grid>
              </Grid>
              {/* <Grid container>Add links</Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
