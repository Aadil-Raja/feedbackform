const cors = require('cors');
const express = require('express');
const { submitFeedback } = require('./controller/customer.js');
const { createFeedbackTable } = require('./model/customer.js');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Ensure table creation happens on startup
createFeedbackTable();

// Feedback Route
app.post('/api/feedback', submitFeedback);

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
