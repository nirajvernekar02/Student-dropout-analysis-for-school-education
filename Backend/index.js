const express = require('express');
const app = express();
const connectToMongo = require('./config/db');
const cors = require('cors');
const cron = require('node-cron');


require('dotenv').config();


// Connect to MongoDB
connectToMongo();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/school',require('./routes/school_route'))
app.use('/api/student',require('./routes/student_route'))
app.use('/api/admin',require('./routes/admin_route'))
app.use('/api/search',require('./routes/search_routes'))
app.use('/api/user',require('./routes/user_route'))




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});