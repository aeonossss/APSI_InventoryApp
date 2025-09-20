import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../FixedHeaderSidebar.css';
import { useState } from 'react';
import '../FixedHeaderSidebar.js';
import '../Orders.css';
import FixedHeaderSidebar from '../FixedHeaderSidebar.js';
import ViewPermission from './ViewPermission.js';

const AccountingView = () => {
  const [activeTab, setActiveTab] = useState('All Orders');

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
      <FixedHeaderSidebar />
      <div className="main-content">
        <div className="header">
          <ViewPermission />
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

export default AccountingView;
