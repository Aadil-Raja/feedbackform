import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'; // renamed or created with correct styles

const FeedbackPage = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [error, setError] = useState('');

  const correctPassword = 'admin123';

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/getfeedback`);
      setFeedbackData(response.data.feedback);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch feedback.');
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchFeedback();
    }
  }, [authenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password!');
    }
  };

  if (!authenticated) {
    return (
      <div className="dashboard-container">
        <h2>Enter Password to View Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="dashboard-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="dashboard-button" type="submit">Submit</button>
        </form>
        {error && <p className="dashboard-error">{error}</p>}
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2>Feedback Records</h2>
      {feedbackData.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Ambiance</th>
              <th>Staff</th>
              <th>Variety</th>
              <th>Email?</th>
              <th>WhatsApp?</th>
              <th>SMS?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map((fb) => (
              <tr key={fb.feedback_id}>
                <td>{fb.firstName} {fb.lastName}</td>
                <td>{fb.phone}</td>
                <td>{fb.email}</td>
                <td>{fb.shoppingAmbiance}</td>
                <td>{fb.staffFriendliness}</td>
                <td>{fb.shoppingVariety}</td>
                <td>{fb.receiveEmail ? 'Yes' : 'No'}</td>
                <td>{fb.receiveWhatsApp ? 'Yes' : 'No'}</td>
                <td>{fb.receiveSMS ? 'Yes' : 'No'}</td>
                <td>{new Date(fb.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackPage;
