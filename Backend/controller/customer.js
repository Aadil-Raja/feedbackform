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
    shoppingVariety,
    consentChecked,
    preferences, // Extract preferences object
  } = req.body;

  // Destructure preferences to extract individual fields
  const { email: receiveEmail, whatsapp: receiveWhatsApp, sms: receiveSMS } = preferences;

  const query = `
    INSERT INTO Feedback (
      firstName, lastName, phone, email, 
      shoppingAmbiance, staffFriendliness, shoppingVariety, 
      consentChecked, receiveEmail, receiveWhatsApp, receiveSMS
    ) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    firstName,
    lastName,
    phone,
    email,
    shoppingAmbiance,
    staffFriendliness,
    shoppingVariety,
    consentChecked,
    receiveEmail,
    receiveWhatsApp,
    receiveSMS,
  ];

  try {
    const [result] = await sequelize.query(query, { replacements: values });
    return res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ error: 'Failed to submit feedback.' });
  }
};
