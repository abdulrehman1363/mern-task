import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import CustomDataTable from '../components/DataTable';
import { Button } from '../components/index';
import DashboardLayout from '../components/DashboardLayout';
import { format } from 'date-fns';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // Define the number of rows per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/categories', {
          params: {
            page: currentPage,
            pageSize,
          },
        });

        setCategories(response.data.data.categories);
        setTotalCategories(response.data.data.totalCategories);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentPage]);

  const handleEdit = (category) => {
    navigate(`/categories/${category._id}`);
  };

  const handleDelete = async (id) => {
    try {
        if (window.confirm('Are you sure you want to delete this car?')) {
            const response = await axiosInstance.delete(`/categories/${id}`);
            if (response.data.success) {
                toast.success('Category deleted successfully');
                setCategories(categories.filter((category) => category._id !== id));
            }
        }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const columns = [
    { name: 'Category Name', selector: row => row.name, sortable: true },
    { 
      name: 'Created At', 
      selector: row => format(new Date(row.createdAt), 'dd MMMM, yyyy hh:mm a'), 
      sortable: true 
    },
  ];

  const handleChangePage = page => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Button onClick={() => navigate('/add-category')} className="bg-green-500 hover:bg-green-600">
            Add Category
          </Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <CustomDataTable
            columns={columns}
            data={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            paginationServer
            paginationTotalRows={totalCategories}
            onChangePage={handleChangePage} 
            currentPage={currentPage}
            paginationPerPage={pageSize}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Categories;
