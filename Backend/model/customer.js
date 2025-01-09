const sequelize = require('../config/db');

exports.createFeedbackTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS Feedback (
      feedback_id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      phone VARCHAR(20),
      email VARCHAR(255) NOT NULL,
      shoppingAmbiance INT NOT NULL DEFAULT 0,
      staffFriendliness INT NOT NULL DEFAULT 0,
      shoppingVariety ENUM('Excellent', 'Good', 'Average', 'Poor') NOT NULL,
       consentChecked BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await sequelize.query(query);
    console.log('Feedback table created (if not exists).');
  } catch (error) {
    console.error('Error creating Feedback table:', error);
  }
};
