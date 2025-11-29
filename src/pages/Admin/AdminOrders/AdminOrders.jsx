import React, { useState } from 'react';

const AdminOrders = () => {
  const [orders] = useState([
    { 
      id: '#12345', 
      customer: 'Alice Johnson', 
      email: 'alice@example.com',
      total: 124.99, 
      status: 'Delivered', 
      date: '2025-01-15',
      items: 3,
      payment: 'Credit Card'
    },
    { 
      id: '#12346', 
      customer: 'Bob Smith', 
      email: 'bob@example.com',
      total: 89.50, 
      status: 'Processing', 
      date: '2025-01-15',
      items: 2,
      payment: 'PayPal'
    },
    { 
      id: '#12347', 
      customer: 'Carol Davis', 
      email: 'carol@example.com',
      total: 156.75, 
      status: 'Shipped', 
      date: '2025-01-14',
      items: 1,
      payment: 'Credit Card'
    },
    { 
      id: '#12348', 
      customer: 'David Wilson', 
      email: 'david@example.com',
      total: 67.20, 
      status: 'Pending', 
      date: '2025-01-14',
      items: 4,
      payment: 'Bank Transfer'
    },
    { 
      id: '#12349', 
      customer: 'Emma Brown', 
      email: 'emma@example.com',
      total: 203.45, 
      status: 'Cancelled', 
      date: '2025-01-13',
      items: 2,
      payment: 'Credit Card'
    }
  ]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Delivered': 'success',
      'Processing': 'warning',
      'Shipped': 'info',
      'Pending': 'secondary',
      'Cancelled': 'danger'
    };
    return `badge bg-${statusMap[status] || 'secondary'}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Orders Management</h2>
        <div className="btn-group">
          <button className="btn btn-outline-primary">
            <i className="bi bi-download me-2"></i>
            Export
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-funnel me-2"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-primary text-white border-0">
            <div className="card-body text-center">
              <h4 className="mb-1">1,247</h4>
              <small>Total Orders</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white border-0">
            <div className="card-body text-center">
              <h4 className="mb-1">23</h4>
              <small>Processing</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white border-0">
            <div className="card-body text-center">
              <h4 className="mb-1">45</h4>
              <small>Shipped</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white border-0">
            <div className="card-body text-center">
              <h4 className="mb-1">1,156</h4>
              <small>Delivered</small>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <div className="row align-items-center">
            <div className="col">
              <h5 className="mb-0">All Orders</h5>
            </div>
            <div className="col-auto">
              <div className="input-group input-group-sm">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search orders..."
                  style={{ width: '200px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <div className="fw-semibold">{order.id}</div>
                    </td>
                    <td>
                      <div>
                        <div className="fw-semibold">{order.customer}</div>
                        <small className="text-muted">{order.email}</small>
                      </div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark">{order.items} items</span>
                    </td>
                    <td className="fw-semibold">${order.total}</td>
                    <td>
                      <small className="text-muted">{order.payment}</small>
                    </td>
                    <td>
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-muted">{order.date}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="View Details">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-info" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-success" title="Print Invoice">
                          <i className="bi bi-printer"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;