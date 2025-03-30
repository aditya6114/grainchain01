import React from 'react';
import './ActiveRequests.css';

const ActiveRequests = ({ requests }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case "Approved": return "status-approved";
      case "In Transit": return "status-transit";
      case "Completed": return "status-completed";
      default: return "status-pending";
    }
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case "High": return "priority-high";
      case "Medium": return "priority-medium";
      default: return "priority-low";
    }
  };
  const dtconv = (st)=>{
    let dt = new Date(st)
    const year = dt.getFullYear();
    const month = String(dt.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dt.getDate()).padStart(2, '0');
    const hours = String(dt.getHours()).padStart(2, '0');
    const minutes = String(dt.getMinutes()).padStart(2, '0');
    const formattedDate = `${hours}:${minutes} ${day}/${month}/${year}`;
    console.log(formattedDate)
    return formattedDate
  }  
  return (
    <section className="requests-section">
      <h2 className='arq'>Active Requests</h2>
      <div className="requests-list">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request._id} className="request-card">
              <div className="request-info">
                <h3>{request.foodType}</h3>
                <p>{request.quantity}</p>
                {request.dietaryRestrictions && (
                  <p className="dietary-info">{request.dietaryRestrictions}</p>
                )}
                <p className="request-date">
                  {dtconv(request.createdAt)}
                </p>
              </div>
              <div className="request-status">
                <span className={`status ${getStatusClass(request.status)}`}>
                  {request.status}
                </span>
                <span className={`priority ${getPriorityClass(request.urgency)}`}>
                  {request.priority} Priority
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No active requests</p>
        )}
      </div>
    </section>
  );
};

export default ActiveRequests;