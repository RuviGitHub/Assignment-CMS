import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd'; // Import message from antd

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',  // Added password field
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    cardName: '',
    cardHolder: '',
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
  });

  const navigate = useNavigate(); // For navigation after successful registration

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      fullName: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      password: formData.password,  // Send password to backend
      addressLine01: formData.addressLine1,
      addressLine02: formData.addressLine2,
      state: formData.state,
      country: formData.country,
      cardName: formData.cardName,
      cardHolder: formData.cardHolder,
      cardNo: formData.cardNumber,
      exp: formData.cardExp,
      cvv: formData.cardCvv,
      status: "ACTIVE"
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/register', registrationData);
      if (response.status === 201) {
        message.success('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful registration
        }, 2000); // Delay navigation for 2 seconds to show the message
      } else {
        message.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      message.error('An error occurred during registration. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <img
            src="src/assets/images/dish.png"
            alt="Delicious Food"
            className="mx-auto h-32 w-32 rounded-full object-cover"
          />
        </div>
        
        <div className="flex bg-gray-700 rounded-full p-1">
          <Link to="/login" className="w-1/2 py-2 text-gray-300 rounded-full text-center">
            Login
          </Link>
          <div className="w-1/2 py-2 bg-rose-500 text-white rounded-full text-center">
            Register
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="text" name="name" placeholder="Full Name" required
              value={formData.name} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="tel" name="mobile" placeholder="Mobile Number" required
              value={formData.mobile} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="email" name="email" placeholder="Email Address" required
              value={formData.email} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="password" name="password" placeholder="Password" required  // Password field
              value={formData.password} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="text" name="addressLine1" placeholder="Shipping Address Line 1" required
              value={formData.addressLine1} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="text" name="addressLine2" placeholder="Shipping Address Line 2"
              value={formData.addressLine2} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="text" name="state" placeholder="State" required
              value={formData.state} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="text" name="country" placeholder="Country" required
              value={formData.country} onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />

            <div className="border-t border-gray-600 pt-4 mt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Card Details</h3>
              <input
                type="text" name="cardName" placeholder="Name on Card" required
                value={formData.cardName} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 mb-4"
              />
              <input
                type="text" name="cardHolder" placeholder="Card Holder" required
                value={formData.cardHolder} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 mb-4"
              />
              <input
                type="text" name="cardNumber" placeholder="Card Number" required
                value={formData.cardNumber} onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 mb-4"
              />
              <div className="flex space-x-4">
                <input
                  type="text" name="cardExp" placeholder="Expiration (MM/YY)" required
                  value={formData.cardExp} onChange={handleChange}
                  className="w-1/2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <input
                  type="text" name="cardCvv" placeholder="CVV" required
                  value={formData.cardCvv} onChange={handleChange}
                  className="w-1/2 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account? {' '}
          <Link to="/login" className="text-rose-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
