import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const Area = () => {
  const [selectedOption, setSelectedOption] = useState("Area1");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="my-20">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ minWidth: "120px" }}
        >
          <MenuItem value="Area1">Area1</MenuItem>
          <MenuItem value="Area2">Area2</MenuItem>
          <MenuItem value="Area3">Area3</MenuItem>
          <MenuItem value="Area4">Area4</MenuItem>
          <MenuItem value="Area5">Area5</MenuItem>
          {/* <MenuItem value="location">location wise</MenuItem> */}
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
                1000
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
                100
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
                10%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Area;
