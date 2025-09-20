import { useNavigate, useLocation } from "react-router-dom";
import './StaffView.css';

function ViewPermission() {
  const nav = useNavigate();
  const location = useLocation();

  //edit role here:
  const userRole = 'accounting';
  const top_tab_staffs = ['Team Lead', 'CSR', 'Warehouse', 'Accounting'];

  //map tab names to routes
  const roleRoutes = {
    'Team Lead': '/TeamLeadView',
    'CSR': '/CSRView',
    'Warehouse': '/WarehouseView',
    'Accounting': '/AccountingView'
  };

  const perms = (userRole, permittedRole, targetPath) => {
    if (userRole === permittedRole) {
      nav(targetPath);
    } else {
      alert("You don't have permission to access this page.");
    }
  };

  const permsRead = (role, tabName) => {
    const targetPath = roleRoutes[tabName];
    perms(userRole, role, targetPath);
  };

  return (
    <div className='view-permission'>
      <div className='top_tab_staffs'>
        {top_tab_staffs.map((tab) => {
          const roleKey = tab.toLowerCase().replace(' ', '-');
          const isActive = location.pathname === roleRoutes[tab];

          return (
            <button
              key={tab}
              onClick={() => permsRead(roleKey, tab)}
              className={isActive ? 'tab active' : 'tab'}>
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ViewPermission;
