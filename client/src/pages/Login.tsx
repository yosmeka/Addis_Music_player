

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart } from '../reducers/authSlice';
import styled from '@emotion/styled';

const LoginPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  background: linear-gradient(to bottom right, #05386B, #5CDB95); /* Gradient background */
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1.2rem;
  color: #05386B;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;

  &:focus {
    border-color: #5CDB95;
    outline: none;
  }
`;

const FormButton = styled.button<{ loading?: boolean }>`
  width: 100%;
  padding: 14px;
  background-color: ${(props) => (props.loading ? '#8EE4AF' : '#05386B')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.loading ? 'not-allowed' : 'pointer')};
  font-size: 1.2rem;
  transition: background-color 0.3s;

  &:hover:not([disabled]) {
    background-color: #379683;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-size: 0.9rem;
  text-align: left;
  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const RegisterLink = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1rem;
  color: #05386B;
`;

const RegisterHere = styled.span`
  color: #379683;
`;

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(loginStart({ username, password }));
      navigate('/');
    } catch (err) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleLogin}>
        <FormLabel htmlFor="username">Username:</FormLabel>
        <FormInput
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <FormLabel htmlFor="password">Password:</FormLabel>
        <FormInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormButton type="submit" disabled={loading} loading={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </FormButton>

        <RegisterLink>
          Don't have an account? <Link to="/register"><RegisterHere>Register here</RegisterHere></Link>
        </RegisterLink>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;

