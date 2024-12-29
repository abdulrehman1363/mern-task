import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import DashboardLayout from '../components/DashboardLayout';
import CategoryForm from '../components/CategoryForm';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '' });
  const [fetching, setFetching] = useState(true);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Category Name is required')
      .min(2, 'Category Name must be at least 2 characters long'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put(`/categories/${id}`, values);
      if (response.data.success) {
        toast.success('Category updated successfully!');
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
        toast.error('Failed to update category. Please try again.');
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axiosInstance.get(`/categories/${id}`);
        if (response.data.success) {
          setInitialValues({ name: response.data.data.name });
        } else {
          toast.error('Failed to fetch category details.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching the category.');
      } finally {
        setFetching(false);
      }
    };

    fetchCategory();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6">Edit Category</h2>
          {fetching ? (
            <div className="text-center">Loading...</div>
          ) : (
            <CategoryForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              loading={loading}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditCategory;
