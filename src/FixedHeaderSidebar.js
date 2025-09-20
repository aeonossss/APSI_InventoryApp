import { ShoppingCart, Package, Users, LogOut, BarChart3, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FixedHeaderSidebar.css';

function FixedHeaderSidebar() {
    const nav = useNavigate();
    const location = useLocation();

    const sidebarItems = [
    { name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { name: 'Order', icon: ShoppingCart, path: '/orders' },
    { name: 'Items', icon: Package, path: '/items' },
    { name: 'Staff View', icon: Users, path: '/staffview' },
  ];
    return(
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
                onClick={() => nav(item.path)}>
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
    );
}

export default FixedHeaderSidebar;