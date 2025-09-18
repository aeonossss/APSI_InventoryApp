import { useState } from 'react';
import './Dashboard.css';
import { BarChart3, ShoppingCart, Package, Users, LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Warehouse');
  
  const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3 },
    { name: 'Order', icon: ShoppingCart },
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
    { name: 'Frosted SnapArmor Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
    { name: 'BloomCase Petals in Spring', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'OUT OF STOCK' },
    { name: 'Sodapop Candy Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'OUT OF STOCK' },
    { name: 'Amber Vein Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
    { name: 'Cursed Feather Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
    { name: 'Twinborn Sky White Case', id: '#01234', price: '$79.25', sales: '$23,356.25', status: 'IN STOCK' },
  ];

  return (
    <div className="dashboard">
      {/* Top Header */}
      <div className="dashboard-header">
        <h1>Overview</h1>
        <div className="user-info">
          <div className="user-avatar">
            <User size={16} className="text-purple-800" />
          </div>
          <div className="user-details">
            <div className="name">Juan Dela Cruz</div>
            <div className="id">#03829</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="sidebar">
          <nav>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.name === 'Dashboard';
              return (
                <button
                  key={item.name}
                  className={isActive ? 'active' : ''}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="logout">
            <button>
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="main">
          {/* Stats Cards */}
          <div className="stats">
            {statsCards.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="number">{stat.number}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs Section */}
          <div className="tabs">
            {/* Tab Headers */}
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

            {/* Table Content */}
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
