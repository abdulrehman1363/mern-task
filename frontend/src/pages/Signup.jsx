//import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../components';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name must be at least 2 characters'),
      lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axiosInstance.post('/auth/signup', values);
        if (response.data.success) {
            toast.success(`Signup successful, we've sent you an email for credentials!`);
            navigate('/login');
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
            toast.error(error.response?.data?.message);
          }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
          />
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <Button type="submit" isDisabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Signing Up...' : 'Signup'}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm">
            Have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Login up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
