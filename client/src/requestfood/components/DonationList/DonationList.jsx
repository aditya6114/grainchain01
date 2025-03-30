import React from 'react';
import './DonationList.css';

const DonationList = ({ donations, loading, onRequestDonation }) => {
  
  return (
    <section className="donations-section">
      <h2>Available Food Donations</h2>
      <div className="donations-list">
        {donations.length > 0 ? (
          donations.map((donation) => (
            <div key={donation.id} className="donation-card">
              {/* Food name moved outside of donation-info */}
              <h3 className="food-name">{donation.foodName}</h3>
              
              <div className="donation-details">
                <p className="quantity">{donation.quantity}</p>
                <p className="quantity">{donation.foodTag}</p>
                <div className="donation-meta">
                  <span className="distance">{donation.address}</span>
                </div>
              </div>
              
              <button 
                className="request-btn"
                onClick={() => onRequestDonation(donation.id)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Request"}
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">No available donations at the moment</p>
        )}
      </div>
    </section>
  );
};

export default DonationList;