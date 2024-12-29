import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/DashboardLayout';
import StatisticsCard from '../components/StatisticsCard';
import QuickActions from '../components/QuickActions';
import axiosInstance from '../utils/axiosInstance';
//import Table from '../components/Table';

const Dashboard = () => {
    const [carCount, setCarCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      const fetchCarCount = async () => {
        try {
          const response = await axiosInstance.get(`cars/count/${user._id}`);
          setCarCount(response.data.data.count);
        } catch (err) {
          setError('Failed to fetch car count.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCarCount();
    }, [user._id]);
  

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <StatisticsCard
          title="Total Cars"
          value={loading ? 'Loading...' : error || `${carCount}`}
          isLoading={loading}
          error={error}
        />
      <QuickActions />
    </DashboardLayout>
  );
};

export default Dashboard;
