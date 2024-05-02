import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  ThemeProvider,
  createTheme,
  Modal,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import contactImage from "../../logo.svg";
import Footer from "../Footer/Footer";
<<<<<<< HEAD
import Navbar from "../Navbar/Navbar";
=======
import Navbar from '../Navbar/Navbar'
>>>>>>> 0202838f646cc4d95f0154d881c64815e975502f
function Contact() {
  const { register, handleSubmit, reset } = useForm();
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1F0954", // Your primary color
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/contact/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setSuccessModalOpen(true);
        reset(); // Reset form fields on successful submission
      } else {
        console.error("Failed to submit contact form:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to submit contact form:", error);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
<<<<<<< HEAD
      <Navbar></Navbar>
=======
        <Navbar></Navbar>
>>>>>>> 0202838f646cc4d95f0154d881c64815e975502f
      <div style={{ fontFamily: "Poppins" }} className="bg-[#F5F5F5]">
        <div className="container mx-auto p-8 bg-[#] rounded-lg">
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", mb: 5 }}
            className="text-center"
          >
            Contact Us
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  {...register("name")}
                  InputProps={{
                    className: "contact-input",
                  }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  {...register("email")}
                  InputProps={{
                    className: "contact-input",
                  }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  {...register("message")}
                  InputProps={{
                    className: "contact-input",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#1F0954",
                    color: "#ffffff",
                    "&:hover": { backgroundColor: "#260B6D" },
                  }}
                >
                  Submit
                </Button>
              </form>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">
                Find more ways to Help!
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                A nonprofit is as strong as the community that holds it up.
                Together, we can do more than we can do alone. Let's bring our
                abilities and passions together to affect real change.
              </p>
              <div className="flex justify-center mb-8">
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  class=" text-center mt-5 wrapper"
                >
                  <a className="ab">
                    <span>Get In Touch!</span>
                  </a>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-8">
                There are many ways to join us and support our mission. Contact
                us to find out more about volunteer opportunities, fundraising
                events, and ways that you can get our message to your friends
                and family.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        open={successModalOpen}
        onClose={handleCloseSuccessModal}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h6"
            id="success-modal-title"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Success!
          </Typography>
          <Typography variant="body1" id="success-modal-description">
            Your message has been sent successfully.
          </Typography>
        </Box>
      </Modal>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default Contact;
<<<<<<< HEAD
=======

>>>>>>> 0202838f646cc4d95f0154d881c64815e975502f
