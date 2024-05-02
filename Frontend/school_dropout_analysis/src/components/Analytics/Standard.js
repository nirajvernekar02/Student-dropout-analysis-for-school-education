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

const Standard = () => {
  const [selectedOption, setSelectedOption] = useState("0");
  const [standardData, setStandardData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/dropout-ratio/standard")
      .then((response) => {
        setStandardData(response.data.standardData);
      })
      .catch((error) => {
        console.error("Error fetching standard data:", error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Find the selected standard data
  const selectedStandard = standardData.find(
    (standard) => standard.standard === selectedOption
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
          selectedStandard ? selectedStandard.totalStudents : 0,
          selectedStandard ? selectedStandard.dropoutStudents : 0,
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
          selectedStandard ? selectedStandard.totalStudents : 0,
          selectedStandard ? selectedStandard.dropoutStudents : 0,
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
          {standardData.map((standard) => (
            <MenuItem key={standard.standard} value={standard.standard}>
              {standard.standard}
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
                {selectedStandard ? selectedStandard.totalStudents : "-"}
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
                {selectedStandard ? selectedStandard.dropoutStudents : "-"}
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
                {selectedStandard
                  ? (selectedStandard.dropoutRatio * 100).toFixed(2) + "%"
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

export default Standard;
