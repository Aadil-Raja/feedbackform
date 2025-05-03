import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackPage = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [feedbackData, setFeedbackData] = useState([]);
  const [error, setError] = useState('');

  const correctPassword = 'admin123'; // CHANGE THIS

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getfeedback`);
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
      <div style={{ padding: '2rem' }}>
        <h2>Enter Password to View Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Feedback Records</h2>
      {feedbackData.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <table border="1" cellPadding="10">
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
