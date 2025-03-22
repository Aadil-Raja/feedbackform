const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.handleLogin = (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.USER;
  const validPassword = process.env.PASS;

  if (username === validUsername && password === validPassword) {
    // Generate token
    const token = jwt.sign(
      { username }, // payload
      process.env.JWT_SECRET,
      { expiresIn: '10h' }
    );

    return res.status(200).json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
};
