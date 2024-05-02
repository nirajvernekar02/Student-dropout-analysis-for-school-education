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

const Age = () => {
  const [selectedOption, setSelectedOption] = useState("10-14");
  const [ageData, setAgeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/dropout-ratio/age")
      .then((response) => {
        setAgeData(response.data.ageData);
      })
      .catch((error) => {
        console.error("Error fetching age data:", error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Find the selected age data
  const selectedAge = ageData.find((age) => age.ageGroup === selectedOption);

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
          selectedAge ? selectedAge.totalStudents : 0,
          selectedAge ? selectedAge.dropoutStudents : 0,
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
          selectedAge ? selectedAge.totalStudents : 0,
          selectedAge ? selectedAge.dropoutStudents : 0,
        ],
        backgroundColor: ["#2196f3", "#4caf50"],
        hoverBackgroundColor: ["#2196f3", "#4caf50"],
      },
    ],
  };

  return (
    <div>
      <div className="my-10">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ minWidth: "120px" }}
        >
          {ageData.map((age) => (
            <MenuItem key={age.ageGroup} value={age.ageGroup}>
              {age.ageGroup}
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
                {selectedAge ? selectedAge.totalStudents : "-"}
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
                {selectedAge ? selectedAge.dropoutStudents : "-"}
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
                {selectedAge
                  ? (selectedAge.dropoutRatio * 100).toFixed(2) + "%"
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
        <Grid item md={6} xs={12}>
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

export default Age;
