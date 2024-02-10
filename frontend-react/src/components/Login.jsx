import React, { useState } from 'react';
import axios from 'axios';  // Import axios for making HTTP requests
import "./login.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSLice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    Email: '',  // Initialize with an empty string or your default value
    password: '' // Initialize with an empty string or your default value
  });

  const loginUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/login', {
        params: {
          Email: userData.email,
          Password: userData.password,
        }
      });
      console.log(response);
      if (response?.data?.data) {
        dispatch(login(response?.data?.data));
        navigate("/");
      } else {
        setError("Invalid credential");
      }

      // Handle the response as needed

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };
console.log(userData)
  return (
    <div className="login-container mx-auto mt-36">
      <h2 className='text-2xl font-bold'>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="emailLogin">Email:</label>
          <input
            type="text"
            id="emailLogin"
            name="email"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordLogin">Password:</label>
          <input
            type="password"
            id="passwordLogin"
            name="password"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }}
          />
        </div>
        {error && (
            <p className="text-red-500 bg-white m-1 rounded-md text-center">
              {error}
            </p>
          )}
        <div className="form-group">
          <button type="button" onClick={loginUser}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;


