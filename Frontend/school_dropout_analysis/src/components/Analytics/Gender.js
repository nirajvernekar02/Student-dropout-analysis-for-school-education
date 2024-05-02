import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "../../chartUtils.js";

const Gender = () => {
  const [selectedOption, setSelectedOption] = useState("Male");
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/dropout-ratio/gender")
      .then((response) => {
        setGenderData(response.data.genderData);
      })
      .catch((error) => {
        console.error("Error fetching gender data:", error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Find the selected gender data
  const selectedGender = genderData.find(
    (gender) => gender.gender === selectedOption
  );

  // Prepare data for bar chart
  const barChartData = {
    labels: ["Total Students", "Dropout Students"],
    datasets: [
      {
        label: "Count",
        backgroundColor: ["#2196f3", "#4caf50"],
        borderColor: ["#2196f3", "#4caf50"],
        borderWidth: 1,
        hoverBackgroundColor: ["#2196f3", "#4caf50"],
        hoverBorderColor: ["#2196f3", "#4caf50"],
        data: [
          selectedGender ? selectedGender.totalStudents : 0,
          selectedGender ? selectedGender.dropoutStudents : 0,
        ],
      },
    ],
  };

  // Prepare data for pie chart
  const pieChartData = {
    labels: ["Total Students", "Dropout Students"],
    datasets: [
      {
        data: [
          selectedGender ? selectedGender.totalStudents : 0,
          selectedGender ? selectedGender.dropoutStudents : 0,
        ],
        backgroundColor: ["#2196f3", "#4caf50"],
        hoverBackgroundColor: ["#2196f3", "#4caf50"],
      },
    ],
  };

  return (
    <div>
      <div className="my-20">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ minWidth: "120px" }}
        >
          {genderData.map((gender) => (
            <MenuItem key={gender.gender} value={gender.gender}>
              {gender.gender}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Grid className="justify-center" container spacing={5}>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#2196f3" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Total Students
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {selectedGender ? selectedGender.totalStudents : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#4caf50" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Dropout Students
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {selectedGender ? selectedGender.dropoutStudents : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#ff9800" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Dropout Ratio
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {selectedGender
                  ? selectedGender.dropoutRatio.toFixed(4) + "%"
                  : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Bar Chart
              </Typography>
              <Bar data={barChartData} key={selectedOption} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pie Chart
              </Typography>
              <Pie data={pieChartData} key={selectedOption} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Gender;
