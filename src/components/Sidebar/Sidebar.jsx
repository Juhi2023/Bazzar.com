import React from 'react';
import logo from "../../assets/images/logo.png"
import './Sidebar.scss'
import dashboard from '../../assets/images/dashboard.svg'
import product from '../../assets/images/product.svg'
import order from '../../assets/images/order.svg'
import review from '../../assets/images/review.svg'
import users from '../../assets/images/users.svg'
import { NavLink } from 'react-router-dom';
import {ReactComponent as CrossIcon} from '../../assets/images/cross.svg'

const Sidebar = ({sidebarOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: dashboard },
    { id: 'products', label: 'Products', path: '/admin/products', icon: product },
    { id: 'orders', label: 'Orders', path: '/admin/orders', icon: order },
    { id: 'reviews', label: 'Reviews', path: '/admin/reviews', icon: review },
    { id: 'users', label: 'Users', path: '/admin/users', icon: users }
  ];

  return (
    <nav 
      className={`sidebar bg-dark text-white position-fixed h-100 ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`} 
        style={{ 
          width: '280px', 
          zIndex: 1000,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease'
        }}
      >
      <div className="d-lg-none p-3 text-end">
        <CrossIcon onClick={toggleSidebar} fill={'white'}/>
      </div>

      <div className="p-4 pt-0 pt-md-4">
        <h4 className="mb-4 text-center">
        <img src={logo} className='ms-3 mt-3 mb-2 mx-lg-0 logo' alt="" />
        <br />
          Bazzar.com Admin
        </h4>
        
        <ul className="nav flex-column">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item mb-2">
              <NavLink
                end
                className={({ isActive }) => `nav-link w-100 text-start border-0 rounded px-3 py-2 d-flex align-items-center ${isActive ? 'active text-white' : 'text-light bg-transparent'}`}
                to={item.path}
                style={{ transition: 'all 0.3s ease' }}
                onClick={window.innerWidth<=768 ? ()=>toggleSidebar() : undefined}
              >
                <img className={`me-3`} width='20px' src={item.icon}/>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

    </nav>
  );
};

export default Sidebar;