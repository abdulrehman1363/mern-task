import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Categories', path: '/categories', icon: '📁' },
    { name: 'Cars', path: '/cars', icon: '🚗' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="px-6 py-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-grow mt-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-sm font-medium ${
                    isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-6 py-4 border-t border-gray-700">
        <ul>
          <li className="mb-2">
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-sm font-medium text-gray-400 hover:text-gray-500"
            >
              Logout
            </button>
          </li>
        </ul>
        <p className="text-sm text-gray-400">&copy; 2024 MERN TASK.</p>
      </div>
    </div>
  );
};

export default Sidebar;
