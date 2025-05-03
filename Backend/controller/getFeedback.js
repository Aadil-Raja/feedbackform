const sequelize = require('../config/db');

exports.getAllFeedback = async (req, res) => {
  const query = `SELECT * FROM Feedback ORDER BY created_at DESC`;

  try {
    const [results] = await sequelize.query(query);
    return res.status(200).json({ feedback: results });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Failed to fetch feedback.' });
  }
};
