import React from 'react';
import { useNavigate } from 'react-router-dom';
import CarForm from '../components/CarForm';
import DashboardLayout from '../components/DashboardLayout';

const AddCar = () => {

  const initialValues = {
    model: '',
    color: '',
    make: '',
    registrationNo: '',
    category: '',
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6">Add New Car</h1>
            <CarForm initialValues={initialValues} isEdit={false} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCar;
