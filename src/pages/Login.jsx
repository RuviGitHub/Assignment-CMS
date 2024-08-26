import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        message.success('Login successful!');
        localStorage.setItem('user', JSON.stringify(response.data.data));
        navigate('/'); // Redirect to a dashboard or home page after login
      } else {
        message.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      message.error('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <img
            src="src/assets/images/dish.png"
            alt="Delicious Food"
            className="mx-auto h-32 w-32 rounded-full object-cover"
          />
        </div>
        
        <div className="flex bg-gray-700 rounded-full p-1">
          <div className="w-1/2 py-2 bg-rose-500 text-white rounded-full text-center">
            Login
          </div>
          <Link to="/register" className="w-1/2 py-2 text-gray-300 rounded-full text-center">
            Register
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account? {' '}
          <Link to="/register" className="text-rose-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
