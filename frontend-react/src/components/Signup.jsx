import React, { useState } from 'react';
import axios from 'axios'; 
import "./signup.css";
import { login } from '../store/authSLice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    age: '',
  });

  const [error, setError] = useState('');
// console.log(userData)
  const signupUser = async () => {
    try {
      // Perform validation if needed before making the request

      
      const response = await axios.post('http://localhost:3000/api/user/createUser', {
        username: userData.username,
        Email: userData.email,
        Password: userData.password,
        Gender: userData.gender,
        Age: userData.age,
      });

      if (response?.data?.data) {
        const res = await axios.get("http://localhost:3000/api/user/getUser", {
            params: {
              UserID: userData?.data?.data, // Assuming userID is the correct parameter name
            },
          });
          console.log(res);
          dispatch(login(res?.data?.data[0]));
        //   console.log("res", res?.data);
          navigate("/");
      }
      // Handle the response as needed

    } catch (error) {
      setError('Error during signup. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup-container mx-auto mt-36">
      <h2 className='text-2xl font-bold'>Sign Up</h2>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="usernameSignup">Username:</label>
          <input
            type="text"
            id="usernameSignup"
            name="username"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailSignup">Email:</label>
          <input
            type="text"
            id="emailSignup"
            name="email"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, email: e.target.value }))
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordSignup">Password:</label>
          <input
            type="password"
            id="passwordSignup"
            name="password"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }))
            }}
          />
        </div>
        <div className="form-group">
  <label htmlFor="genderSignup">Gender:</label>
  <select
    id="genderSignup"
    name="gender"
    required
    onChange={(e) => {
      setUserData((prev) => ({ ...prev, gender: e.target.value }))
    }}
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>

        <div className="form-group">
          <label htmlFor="ageSignup">Age:</label>
          <input
            type="text"
            id="ageSignup"
            name="age"
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, age: e.target.value }))
            }}
          />
        </div>
        {error && (
          <p className="text-red-500 bg-white m-1 rounded-md text-center">
            {error}
          </p>
        )}
        <div className="form-group">
          <button type="button" onClick={signupUser}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
