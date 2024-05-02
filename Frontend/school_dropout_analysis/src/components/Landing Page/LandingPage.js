import React from "react";
import Navbar from "../Navbar/Navbar";
import { Button, Grid, Typography } from "@material-ui/core";
import LandingVector from "../Images/landingPageVector.png";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import PercentageREsult from "./PercentageResult";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./Landing.css";
function LandingPage() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyContent: "space-around",
          height: "88vh",
          borderTop: "2px solid white",
          // border: "1px solid red",
          backgroundColor: "#1c1d21",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
            flexDirection: "column",
            // border: "1px solid red",
            width: "750px",
            height: "300px",
            padding: "10px",
            backgroundColor: "#1c1d21",
          }}
        >
          <Typography variant="h2" className="text-white" fontWeight="bold">
            Empowering Education Through Dropout Insights.
          </Typography>
          {/* <Typography variant="h6"> */}
          <p className="px-8 text-white" style={{ textAlign: "justify" }}>
          EduDrop Insights is a cutting-edge Data Analytics platform that tackles the high dropout rate crisis in education. By leveraging Data Analytics and data visualization, it provides granular insights into dropout patterns across school, area, gender, caste, and age/standard. 

          </p>
          {/* </Typography> */}
          <Link to="/analytics">
            <Button
              color="primary"
              style={{
                backgroundColor: "#925FE2",
                color: "white",
                padding: "10px",
                width: "250px",
                marginTop: "40px",
                marginLeft: "40px",
                marginRight: "auto", // Align the button to the left
                borderRadius: "20px",
              }}
            >
              Analyze
            </Button>
          </Link>
        </div>
        <div
          style={{ width: "450px", height: "300px" }}
          // style={{ border: "1px solid red", width: "450px", height: "300px" }}
        >
          <img
            src={LandingVector}
            alt="No-vector"
            style={{ position: "relative", bottom: "80px" }}
          ></img>
          <div
            style={{
              width: "180px",
              height: "90px",
              // display: "flex",
              // alignContent: "center",
              // justifyContent: "center",
              // flexDirection: "column",
              // border: "1px solid red",
              position: "absolute",
              bottom: "90px",
              paddingTop: "10px",
              // padding: "5px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          >
            <PercentageREsult></PercentageREsult>
            <p className="text-black">Success Result</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="my-8">
          <Typography variant="h5">
            The Perfect Solution to your Relationship Issues
          </Typography>
        </div>
        <p className="m-4" style={{ width: "350px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet
          et hendrerit in, accumsan tempus
        </p>
      </div>
      <Grid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "400px",
        }}
      >
        <div className="card" style={{ margin: "30px" }}>
          <div className="content">
            <SchoolIcon fontSize="large" style={{ color: "black" }} />

            <p className="para text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
              laboriosam at voluptas minus culpa deserunt delectus sapiente
              inventore pariatur
            </p>
          </div>
        </div>
        <div className="card" style={{ margin: "30px" }}>
          <div className="content">
            <AssessmentIcon fontSize="large" style={{ color: "black" }} />
            <p className="para text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
              laboriosam at voluptas minus culpa deserunt delectus sapiente
              inventore pariatur
            </p>
          </div>
        </div>
        <div className="card" style={{ margin: "30px" }}>
          <div className="content">
            {/* <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"></path>
            </svg> */}
            <BarChartIcon fontSize="large" style={{ color: "black" }} />
            <p className="para text-black">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
              laboriosam at voluptas minus culpa deserunt delectus sapiente
              inventore pariatur
            </p>
          </div>
        </div>
      </Grid>
      <Footer />
    </div>
  );
}

export default LandingPage;
