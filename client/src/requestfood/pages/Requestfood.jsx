  import React, { useState,useEffect} from 'react';
  // import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
  import DonationList from '../components/DonationList/DonationList';
  import FoodRequestForm from '../components/FoodRequestForm/FoodRequestForm';
  import ActiveRequests from '../components/ActiveRequests/ActiveRequests';
  import '../styles/main.css';
import axios from 'axios';
    
  const RecipientDashboard = () => {
    const [availableDonations, setAvailableDonations] = useState([]);
    const [activeRequests, setActiveRequests] = useState([]);

    const [loading, setLoading] = useState({
      donations: false,
      submittingRequest: false,
      submittingFeedback: false
    });

    useEffect(() => {
      fetchFoodItems();
    }, []);
  
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/allfoods");
        setAvailableDonations(response.data);
      } catch (error) {
        console.log(error);
      }
    };  

    useEffect(() => {
      fetchActivereq();
    }, []);
  
    const fetchActivereq = async () => {
      try {
        const response = await axios.get("http://localhost:3000/food", {
          timeout: 5000
        });
    
        // Handle different response formats
        let responseData = [];
        
        if (response.data) {
          // Case 1: Direct array response
          if (Array.isArray(response.data)) {
            responseData = response.data;
          }
          // Case 2: Wrapped response { data: [...] }
          else if (Array.isArray(response.data.data)) {
            console.log("here2");
            responseData = response.data.data;
            console.log(responseData);
          }
        }
    
        setActiveRequests(responseData);
      } catch (error) {
        console.error("Fetch error:", error);
        setActiveRequests([]); // Fallback to empty array
        
        // Optional: Show error to user
        setError("Failed to load requests. Please try again.");
      }
    };
  

    const handleRequestDonation = (donationId) => {
      // ... implementation
    };

    const handleSubmitRequest = (formData) => {
      // ... implementation
    };


    return (
      <div className="recipient-dashboard">
        <main className="container main-content">
          <div className="dashboard-grid">
            <DonationList 
              donations={availableDonations} 
              loading={loading.donations}
              onRequestDonation={handleRequestDonation}
            />
            <FoodRequestForm 
              onSubmit={handleSubmitRequest}
              loading={loading.submittingRequest}
            />
          </div>
          <ActiveRequests requests={activeRequests} />
        </main>
      </div>
    );
  };

  export default RecipientDashboard;