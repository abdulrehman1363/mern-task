import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CustomDataTable from '../components/DataTable';
import axiosInstance from '../utils/axiosInstance';
import DashboardLayout from '../components/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

const CarsListing = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const rowsPerPage = 10;

  const fetchCars = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/cars?page=${page}&limit=${rowsPerPage}`);
      setCars(response.data.data.cars);
      setTotalRows(response.data.data.total);
    } catch (error) {
      toast.error('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car) => {
    navigate(`/edit-car/${car._id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await axiosInstance.delete(`/cars/${id}`);
        toast.success('Car deleted successfully!');
        fetchCars(currentPage);
      } catch (error) {
        toast.error('Failed to delete car. Please try again.');
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCars(page);
  };

  

  useEffect(() => {
    fetchCars(currentPage);
  }, [currentPage]);

  const columns = [
    {
      name: 'Model',
      selector: (row) => row.model,
      sortable: true,
    },
    {
      name: 'Color',
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: 'Make',
      selector: (row) => row.make,
      sortable: true,
    },
    {
      name: 'Registration Number',
      selector: (row) => row.registrationNo,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category?.name || 'N/A',
      sortable: true,
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Car Listing</h2>
                  <Button onClick={() => navigate('/add-car')} className="bg-green-500 hover:bg-green-600">
                    Add Car
                  </Button>
                </div>

          {
            loading ? (
                <div>Loading...</div>
              ): (
                <CustomDataTable
                    columns={columns}
                    data={cars}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    paginationServer
                    paginationTotalRows={totalRows}
                    currentPage={currentPage}
                    paginationPerPage={rowsPerPage}
                    onChangePage={handlePageChange}
                />
            )}
      </div>
    </DashboardLayout>
  );
};

export default CarsListing;
