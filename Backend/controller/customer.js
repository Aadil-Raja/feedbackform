const sequelize = require('../config/db');

exports.submitFeedback = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    phone,
    email,
    shoppingAmbiance,
    staffFriendliness,
    shoppingVariety // Will validate against ENUM values
  } = req.body;

  const query = `
    INSERT INTO Feedback (
      firstName, lastName, phone, email, 
      shoppingAmbiance, staffFriendliness, shoppingVariety
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    firstName,
    lastName,
    phone,
    email,
    shoppingAmbiance,
    staffFriendliness,
    shoppingVariety
  ];

  try {
    const [result] = await sequelize.query(query, { replacements: values });
    return res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ error: 'Failed to submit feedback.' });
  }
};
