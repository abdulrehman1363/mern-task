import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Select, Button } from './index';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CarForm = ({ initialValues, onSubmit, isEdit = false }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axiosInstance.get('/categories');
          setCategories(response.data.data.categories || []);
        } catch (error) {
          console.error('Failed to load categories');
        }
      };
  
      fetchCategories();
    }, []);
  
    const formik = useFormik({
      initialValues,
      validationSchema: Yup.object({
        model: Yup.string().required('Model is required'),
        color: Yup.string().required('Color is required'),
        make: Yup.string().required('Make is required'),
        registrationNo: Yup.string().required('Registration number is required'),
        category: Yup.string().required('Category is required'),
      }),
      onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
        setLoading(true);
        try {
            let response = null;
            if(!isEdit){
                response = await axiosInstance.post('/cars', values);
            }else{
                response = await axiosInstance.put(`/cars/${values.id}`, {
                    model: values.model,
                    color: values.color,
                    make: values.make,
                    registrationNo: values.registrationNo,
                    category: values.category
                });
            }
          
          if (response.data.success) {
            toast.success(isEdit ? 'Car updated successfully!' : 'Car added successfully!');
            if (!isEdit) resetForm();
            navigate('/cars');
          }
        } catch (error) {
          if (error.response?.data?.errors) {
            const fieldErrors = [];
            error.response.data.errors.forEach((err) => {
            if (err.path?.[0]) {
                fieldErrors[err.path[0]] = err.message;
            }
            });
            setErrors(fieldErrors);
          } else {
            toast.error('An unexpected error occurred. Please try again.');
          }
        } finally {
          setSubmitting(false);
          setLoading(false);
        }
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          id="model"
          name="model"
          placeholder="Car Model"
          value={formik.values.model}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.model}
          touched={formik.touched.model}
        />
        <Input
          id="color"
          name="color"
          placeholder="Car Color"
          value={formik.values.color}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.color}
          touched={formik.touched.color}
        />
        <Input
          id="make"
          name="make"
          placeholder="Car Make"
          value={formik.values.make}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.make}
          touched={formik.touched.make}
        />
        <Input
          id="registrationNo"
          name="registrationNo"
          placeholder="Registration Number"
          value={formik.values.registrationNo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.registrationNo}
          touched={formik.touched.registrationNo}
        />
        <Select
          id="category"
          name="category"
          options={categories}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.category}
          touched={formik.touched.category}
        />
        <Button type="submit" isDisabled={formik.isSubmitting || loading}>
          {loading ? (isEdit ? 'Updating Car...' : 'Adding Car...') : isEdit ? 'Update Car' : 'Add Car'}
        </Button>
      </form>
    );
};
  

export default CarForm;
