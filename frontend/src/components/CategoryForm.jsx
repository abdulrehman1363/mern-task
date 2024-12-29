import React from 'react';
import { useFormik } from 'formik';
import { Input, Button } from './index';

const CategoryForm = ({ initialValues, validationSchema, onSubmit, loading }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        name="name"
        placeholder="Category Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.name}
        touched={formik.touched.name}
      />
      <Button type="submit" isDisabled={formik.isSubmitting || loading}>
        {loading ? 'Processing...' : 'Submit'}
      </Button>
    </form>
  );
};

export default CategoryForm;
