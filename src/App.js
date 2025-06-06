import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const App = () => {
  const [fact, setFact] = useState('');
  const [error, setError] = useState('');

  const fetchFact = async () => {
    try {
      setError('');
      const res = await fetch('https://catfact.ninja/fact');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setFact(data.fact);
    } catch (err) {
      setError('😿 Unable to fetch fact. Try again!');
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>🐾 Cat Fact Fetcher</Title>
        <Button onClick={fetchFact}>Tell Me a Cat Fact</Button>
        {fact && <Fact>"{fact}"</Fact>}
        {error && <Error>{error}</Error>}
      </Card>
    </Wrapper>
  );
};

export default App;

// Styled Components
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fceabb 0%, #f8b500 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
`;

const Card = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  max-width: 600px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Button = styled.button`
  margin-top: 20px;
  background: #ff8c94;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff5e6c;
  }
`;

const Fact = styled.p`
  margin-top: 30px;
  font-size: 1.2rem;
  color: #444;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 15px;
  animation: ${fadeIn} 0.4s ease;
`;

const Error = styled.p`
  margin-top: 20px;
  color: #e74c3c;
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease;
`;
