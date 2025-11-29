import React, { useState } from 'react';

const AdminUsers = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-03-15',
      orders: 12,
      totalSpent: 1247.89,
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-05-22',
      orders: 8,
      totalSpent: 689.45,
      avatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-11-08',
      orders: 0,
      totalSpent: 0,
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david@example.com',
      role: 'Customer',
      status: 'Inactive',
      joinDate: '2024-01-30',
      orders: 3,
      totalSpent: 234.67,
      avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 5,
      name: 'Emma Brown',
      email: 'emma@example.com',
      role: 'Customer',
      status: 'Active',
      joinDate: '2024-07-12',
      orders: 15,
      totalSpent: 1856.23,
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': 'success',
      'Inactive': 'secondary'
    };
    return `badge bg-${statusMap[status] || 'secondary'}`;
  };

  const getRoleBadge = (role) => {
    const roleMap = {
      'Admin': 'danger',
      'Customer': 'primary'
    };
    return `badge bg-${roleMap[role] || 'secondary'}`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Users Management</h2>
        
      </div>

      {/* Search and Filter */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                />
              </div>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>All Roles</option>
                <option>Customer</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="col-md-3">
              <select className="form-select">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-outline-primary w-100">
                <i className="bi bi-funnel"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">All Users</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Join Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="rounded-circle me-3"
                          style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        />
                        <div>
                          <div className="fw-semibold">{user.name}</div>
                          <small className="text-muted">{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={getRoleBadge(user.role)}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className="fw-semibold">{user.orders}</span>
                    </td>
                    <td className="fw-semibold">${user.totalSpent.toFixed(2)}</td>
                    <td className="text-muted">{user.joinDate}</td>
                    <td>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-outline-primary" title="View Profile">
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-outline-info" title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-warning" title="Suspend">
                          <i className="bi bi-pause-circle"></i>
                        </button>
                        <button className="btn btn-outline-danger" title="Delete">
                          <i className="bi bi-trash"></i>
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

export default AdminUsers;