const cors = require('cors');
const express = require('express');
const { submitFeedback } = require('./controller/customer.js');
const { createFeedbackTable } = require('./model/customer.js');
const { handleLogin } = require('./controller/Login.js');
const verifyToken = require('./middleware/auth.js');
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Ensure table creation happens on startup
createFeedbackTable();

// Feedback Route
app.post('/api/feedback', submitFeedback);

app.post('/api/login', handleLogin);

app.get('/api/verify_token', verifyToken, (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.username}! This is your dashboard.` });
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});
