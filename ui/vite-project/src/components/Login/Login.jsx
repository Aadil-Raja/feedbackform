import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password })
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('token', data.token);
        navigate('/feedback'); // navigate to dashboard
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-muted mb-3 text-center">Please enter your login and password!</p>

              <MDBInput
                wrapperClass='mb-4 w-100'
                label='Email address'
                id='email'
                type='email'
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <MDBInput
                wrapperClass='mb-4 w-100'
                label='Password'
                id='password'
                type='password'
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn size='lg' onClick={handleLogin}>
                Login
              </MDBBtn>

              <hr className="my-4" />

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
