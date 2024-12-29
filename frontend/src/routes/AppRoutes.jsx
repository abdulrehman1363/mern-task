///import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CreateCategory from '../pages/CreateCategory';
import Categories from '../pages/Categories';
import EditCategory from '../pages/EditCategory';
import ProtectedRoute from './ProtectedRoute';
import CreateCar from '../pages/CreateCar';
import CarsListing from '../pages/CarListing';
import EditCar from '../pages/EditCar';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
       <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-category"
        element={
          <ProtectedRoute>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories/:id"
        element={
          <ProtectedRoute>
            <EditCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/add-car"
        element={
          <ProtectedRoute>
            <CreateCar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-car/:id"
        element={
          <ProtectedRoute>
            <EditCar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cars"
        element={
          <ProtectedRoute>
            <CarsListing />
          </ProtectedRoute>
        }
      />

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
