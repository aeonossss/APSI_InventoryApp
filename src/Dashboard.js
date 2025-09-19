import { useState } from 'react';
import './Dashboard.css';
import './Orders.js';
import './FixedHeaderSidebar.css';

import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, ShoppingCart, Package, Users, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Warehouse');
  
  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { name: 'Order', icon: ShoppingCart, path: '/orders' },
    { name: 'Items', icon: Package },
    { name: 'Customer', icon: Users },
  ];

  const statsCards = [
    { number: '56,328', label: 'Orders' },
    { number: '984', label: 'Products' },
    { number: '$102,408', label: 'Sales' },
    { number: '3,747', label: 'Customers' },
  ];

  const tabs = ['Warehouse', 'Staff', 'Orders'];

  const products = [
    { name: 'Sodapop Candy Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'OUT OF STOCK' },
    { name: 'Amber Vein Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
    { name: 'Cursed Feather Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
    { name: 'Twinborn Sky White Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <div className="user-info">
          <div className="user-avatar">
            <User size={16} className="sidebar-text" />
          </div>
          <div className="user-details">
            <div className="name">Juan Dela Cruz</div>
            <div className="id">#03829</div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="sidebar">
          <nav>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  className={isActive ? 'active' : ''}
                  onClick={() => {
                    nav(item.path)
                  }}>
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="logout">
            <button onClick={() => nav('/loginpage')}>
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>

        <div className="main">

          <div className="stats">
            {statsCards.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="number">{stat.number}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="tabs">
            <div className="tab-headers">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={activeTab === tab ? 'active' : ''}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="table-container">
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Product ID</th>
                      <th>Price</th>
                      <th>Sales</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.id}</td>
                        <td>{product.price}</td>
                        <td>{product.sales}</td>
                        <td>
                          <span
                            className={`status ${
                              product.status === 'IN STOCK' ? 'in-stock' : 'out-stock'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="view-all">
                <button>View all..</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
