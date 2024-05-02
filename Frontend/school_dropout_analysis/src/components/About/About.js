import React from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";

import image1 from "../Images/image1.png";
import image2 from "../Images/image2.png";
import image3 from "../Images/image3.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                About Us
              </Typography>
              <Typography
                sx={{ my: 10 }}
                variant="body1"
                gutterBottom
                // style={{
                //   boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                //   height: "300px",
                //   textAlign: "center",
                // }}
              >
                Welcome to EduDrop Insights! EduDrop Insights is an initiative
                aimed at tackling the challenge of high dropout rates in schools
                using advanced technology. Our goal is to provide valuable
                insights and practical recommendations to stakeholders like
                governments, policymakers, and educational institutions to
                enhance the quality of education for all children.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <img
                src={image1}
                alt="About Us"
                className="w-full h-auto rounded-lg"
              />
            </Grid>
          </Grid>
        </Box>

        <Box py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <img
                src={image2}
                alt="Our Approach"
                className="w-full h-auto rounded-lg"
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Our Approach
              </Typography>
              <Typography sx={{ my: 10 }} variant="body1" gutterBottom>
                Our approach at EduDrop Insights involves leveraging advanced
                machine learning techniques to tackle high dropout rates in
                schools. By analyzing various factors such as school
                demographics, student characteristics, and historical data, our
                machine learning models can predict dropout risks accurately.
                This data-driven approach allows us to provide actionable
                insights and personalized recommendations to stakeholders,
                enabling targeted interventions and strategies.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box py={6}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Our Commitment
              </Typography>
              <Typography sx={{ my: 10 }} variant="body1" gutterBottom>
                We are committed to making a meaningful impact in addressing
                student dropout issues. By combining technology with our passion
                for education, our dedication extends to collaborating with
                stakeholders, empowering educators, advocating for systemic
                reforms, and engaging with communities to ensure every child has
                access to quality education and the opportunity to succeed.
              </Typography>
              <Button variant="contained" color="primary">
                Contribute to Work
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <img
                src={image3}
                alt="Our Commitment"
                className="w-full h-auto rounded-lg"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default About;
