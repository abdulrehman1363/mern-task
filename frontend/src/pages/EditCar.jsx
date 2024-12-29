import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CarForm from '../components/CarForm';
import DashboardLayout from '../components/DashboardLayout';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axiosInstance.get(`/cars/${id}`);
        setCar(response.data.data);
      } catch (error) {
        toast.error('Failed to load car details. Please try again.');
        navigate('/cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-4">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!car) {
    return (
      <DashboardLayout>
        <div className="p-4">Car not found.</div>
      </DashboardLayout>
    );
  }

  const initialValues = {
    id: car._id,
    model: car.model || '',
    color: car.color || '',
    make: car.make || '',
    registrationNo: car.registrationNo || '',
    category: car.category || '',
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6">Edit Car</h1>
            <CarForm initialValues={initialValues} isEdit={true} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditCar;
