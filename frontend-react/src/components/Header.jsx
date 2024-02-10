import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSLice';

const Header = () => {
  const headerStyle = {
    background: 'green',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const status = useSelector(state => state.status)
  return (
    <div style={headerStyle} className="bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Book</h1>
      {status && (
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <div>
              <span className="font-bold">All Books</span>
            </div>
            <div>
              <span className="font-bold">Read Books</span>
            </div>
            <div>
              <span className="font-bold">Interested Books</span>
            </div>
          <div>
            <span className="font-bold">Recommended Books</span>
          </div>
          </div>
          <div>
            <span className="font-bold" onClick={handleLogout}>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
