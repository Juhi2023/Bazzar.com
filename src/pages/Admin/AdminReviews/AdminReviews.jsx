import React, { useState } from 'react';

const AddReviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      customer: 'Alice Johnson',
      product: 'Wireless Headphones',
      rating: 5,
      comment: 'Amazing sound quality and very comfortable. Highly recommend!',
      date: '2025-01-15',
      status: 'Published',
      helpful: 12
    },
    {
      id: 2,
      customer: 'Bob Smith',
      product: 'Smart Watch',
      rating: 4,
      comment: 'Good features but battery life could be better. Overall satisfied.',
      date: '2025-01-14',
      status: 'Published',
      helpful: 8
    },
    {
      id: 3,
      customer: 'Carol Davis',
      product: 'Running Shoes',
      rating: 3,
      comment: 'Decent shoes but sizing runs small. Consider ordering a size up.',
      date: '2025-01-13',
      status: 'Pending',
      helpful: 3
    },
    {
      id: 4,
      customer: 'David Wilson',
      product: 'Coffee Maker',
      rating: 1,
      comment: 'Broke after one week. Very disappointed with the quality.',
      date: '2025-01-12',
      status: 'Flagged',
      helpful: 5
    },
    {
      id: 5,
      customer: 'Emma Brown',
      product: 'Gaming Mouse',
      rating: 5,
      comment: 'Perfect for gaming! Responsive and comfortable grip.',
      date: '2025-01-11',
      status: 'Published',
      helpful: 15
    }
  ]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`bi ${i < rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
      ></i>
    ));
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Published': 'success',
      'Pending': 'warning',
      'Flagged': 'danger'
    };
    return `badge bg-${statusMap[status] || 'secondary'}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Reviews Management</h2>
        <div className="btn-group">
          <button className="btn btn-outline-primary">
            <i className="bi bi-funnel me-2"></i>
            Filter
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-check-square me-2"></i>
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Review Stats */}
      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="text-primary mb-1">4.2</h3>
              <div className="mb-2">
                {renderStars(4)}
              </div>
              <small className="text-muted">Average Rating</small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="text-success mb-1">1,847</h3>
              <small className="text-muted">Total Reviews</small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="text-warning mb-1">23</h3>
              <small className="text-muted">Pending Review</small>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="text-danger mb-1">5</h3>
              <small className="text-muted">Flagged Reviews</small>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Recent Reviews</h5>
        </div>
        <div className="card-body p-0">
          {reviews.map(review => (
            <div key={review.id} className="border-bottom p-4">
              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{review.customer}</h6>
                      <div className="d-flex align-items-center mb-2">
                        <div className="me-3">
                          {renderStars(review.rating)}
                        </div>
                        <small className="text-muted">for {review.product}</small>
                      </div>
                    </div>
                    <span className={getStatusBadge(review.status)}>
                      {review.status}
                    </span>
                  </div>
                  
                  <p className="mb-2 text-muted">{review.comment}</p>
                  
                  <div className="d-flex align-items-center text-muted">
                    <small className="me-4">
                      <i className="bi bi-calendar3 me-1"></i>
                      {review.date}
                    </small>
                    <small>
                      <i className="bi bi-hand-thumbs-up me-1"></i>
                      {review.helpful} found helpful
                    </small>
                  </div>
                </div>
                
                <div className="col-md-4 text-md-end">
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-success" title="Approve">
                      <i className="bi bi-check-lg"></i>
                    </button>
                    <button className="btn btn-outline-warning" title="Flag">
                      <i className="bi bi-flag"></i>
                    </button>
                    <button className="btn btn-outline-danger" title="Delete">
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddReviews;