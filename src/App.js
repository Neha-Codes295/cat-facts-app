// App.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

/**
 * Main App Component
 * Fetches and displays a random cat fact when button is clicked.
 */
const App = () => {
  // State to store fetched fact
  const [fact, setFact] = useState('');
  // State to store any error messages
  const [error, setError] = useState('');

  /**
   * Fetch a random cat fact from public API.
   * Uses async/await and basic error handling.
   */
  const fetchFact = async () => {
    try {
      // Clear previous error
      setError('');
      // Call API
      const response = await fetch('https://catfact.ninja/fact');

      // Check if response is ok (status 200-299)
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();

      // Update fact state
      setFact(data.fact);
    } catch (err) {
      // Handle errors and update error state
      setError('😿 Unable to fetch fact. Please try again.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>🐾 Cat Fact Fetcher</Title>
        <Button onClick={fetchFact}>Tell Me a Cat Fact</Button>
        {/* Display fact if fetched */}
        {fact && <Fact>"{fact}"</Fact>}
        {/* Display error if any */}
        {error && <Error>{error}</Error>}
      </Card>
    </Wrapper>
  );
};

export default App;

// ======= Styled Components =======

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Wrapper covers full viewport and centers content
const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fceabb 0%, #f8b500 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

// Card container with white background and shadow
const Card = styled.div`
  background: #fff;
  padding: 40px 50px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 600px;
  width: 90%;
  animation: ${fadeIn} 0.5s ease-out;
`;

// Title styling
const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

// Button styling with hover effect
const Button = styled.button`
  margin-top: 20px;
  background: #ff8c94;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #ff5e6c;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px #ffb3b8;
  }
`;

// Fact text styling
const Fact = styled.p`
  margin-top: 30px;
  font-size: 1.3rem;
  color: #444;
  background: #f9f9f9;
  padding: 20px 25px;
  border-radius: 15px;
  animation: ${fadeIn} 0.4s ease;
  font-style: italic;
`;

// Error message styling
const Error = styled.p`
  margin-top: 20px;
  color: #e74c3c;
  font-weight: 700;
  animation: ${fadeIn} 0.3s ease;
`;
