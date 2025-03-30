import React, { useState } from 'react';
import axios from 'axios';
import './FoodRequestForm.css';

const FoodRequestForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    dietaryRestrictions: "",
    urgency: "Medium",
    location: "" // Added location field to match your schema
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    
    try {
      // Get user email from your auth context or local storage
      const userEmail = localStorage.getItem("email")  // Replace with actual auth logic
      
      const response = await axios.post('http://localhost:3000/foodrequests', {
        formData: {
          ...formData,
          email: userEmail
        }
      });

      setSuccess(true);
      if (onSubmit) {
        onSubmit(response.data.request); // Pass the created request to parent if needed
      }
      
      // Reset form after successful submission
      setFormData({
        foodType: "",
        quantity: "",
        dietaryRestrictions: "",
        urgency: "Medium",
        location: ""
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting request:', err);
      setError(err.response?.data?.message || 'Failed to submit request');
    }
  };

  return (
    <section className="request-section">
      <h2>Request Food</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Request submitted successfully!</div>}
      
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label htmlFor="foodType">Food Type</label>
          <input
            id="foodType"
            type="text"
            placeholder="e.g. Vegetables, Bread, etc."
            value={formData.foodType}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="quantity">Quantity Needed</label>
          <input 
            id="quantity"
            type="text"
            placeholder="e.g. 5 kg, 10 portions"
            value={formData.quantity}
            onChange={handleInputChange}
            required
            style={{ 
              color: 'black',
              padding: '10px', 
              border: '2px solid #ccc', 
              borderRadius: '5px',
              width: '300px',
              margin:'0px'
            }}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
          <input
            id="dietaryRestrictions"
            type="text"
            placeholder="e.g. Vegetarian, Gluten-free"
            value={formData.dietaryRestrictions}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="urgency">Urgency</label>
          <select
            id="urgency"
            value={formData.urgency}
            onChange={handleInputChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Your location for pickup"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </section>
  );
};

export default FoodRequestForm;