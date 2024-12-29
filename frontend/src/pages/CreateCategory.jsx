import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import DashboardLayout from '../components/DashboardLayout';
import CategoryForm from '../components/CategoryForm';

const CreateCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = { name: '' };
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Category Name is required')
      .min(2, 'Category Name must be at least 2 characters long'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/categories', values);
      if (response.data.success) {
        toast.success('Category added successfully!');
        resetForm();
        navigate('/categories');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const fieldErrors = {};
        error.response.data.errors.forEach((err) => {
          if (err.path?.[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast.error('Failed to add category. Please try again.');
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
          <CategoryForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCategory;
