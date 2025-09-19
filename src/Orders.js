import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Package, Users, LogOut, ChevronLeft, ChevronRight, BarChart3, User } from 'lucide-react';
import './Orders.css';

const Orders = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('All Orders');

  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { name: 'Order', icon: ShoppingCart, path: '/orders' },
    { name: 'Items', icon: Package, path: '/items' },
    { name: 'Customer', icon: Users, path: '/customer' },
  ];

  const orders = [
    { itemId: '#01234', date: '12 Sept, 2025', orderId: '#01234', customer: 'AWM Inc', total: '$23,356.25', status: 'PAID' },
    { itemId: '#01234', date: '12 Sept, 2025', orderId: '#01234', customer: 'AWM Inc', total: '$23,356.25', status: 'PENDING' },
    { itemId: '#01234', date: '12 Sept, 2025', orderId: '#01234', customer: 'AWM Inc', total: '$23,356.25', status: 'PAID' },
    { itemId: '#01234', date: '12 Sept, 2025', orderId: '#01234', customer: 'AWM Inc', total: '$23,356.25', status: 'PENDING' },
  ];

  const top_tabs = ['All Orders', 'Pending', 'To Ship', 'Completed'];

  const getStatusBadge = (status) => (
    <span className={`status-badge ${status === 'PAID' ? 'paid' : 'pending'}`}>
      {status}
    </span>
  );

  return (
    <div className="Orders-container">
      <div className="sidebar">
        <div className="dashboard-header-orders">
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

        <nav>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                className={isActive ? 'active' : ''}
                onClick={() => nav(item.path)}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>
        <div>
          <button onClick={() => nav('/loginpage')}>
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="header">
          <div className="top_tabs">
            {top_tabs.map((top_tab) => (
              <button
                key={top_tab}
                onClick={() => setActiveTab(top_tab)}
                className={activeTab === top_tab ? 'tab active' : 'tab'}>
                {top_tab}
              </button>
            ))}
          </div>
        </div>

        <div className="orders-table">
          <div className="table-header">
            <div>Item ID</div>
            <div>Date</div>
            <div>Order ID</div>
            <div>Customer</div>
            <div>Total Price</div>
            <div>Billing</div>
          </div>

          <div className="table-body">
            {orders.map((order, idx) => (
              <div key={idx} className="table-row">
                <div>{order.itemId}</div>
                <div>{order.date}</div>
                <div>{order.orderId}</div>
                <div>{order.customer}</div>
                <div>{order.total}</div>
                <div>{getStatusBadge(order.status)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          <button className="page-btn"><ChevronLeft size={16} /></button>
          <div className="page-numbers">
            <button className="current">1</button>
            <button>2</button>
            <span>...</span>
            <button>9</button>
          </div>
          <button className="page-btn"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
