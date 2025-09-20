import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from '../supabaseClient.js'
import './StaffView.css';

function ViewPermission() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define tabs and their corresponding roles and routes
  const staffTabs = [
    {name: 'Team lead', role: 'team_lead', route: '/TeamLeadView'},
    {name: 'CSR', role:'csr', route:'/CSRView'},
    {name: 'Warehouse', role: 'warehouse', route: '/WarehouseView'},
    {name: 'Accounting', role: 'accounting', route: '/AccountingView'},
  ];

  useEffect(() => {
    async function getSession(){
      const { data: {user}} = await supabase.auth.getUser();

      if(user) {
        // Where does the role stored??
        setUserRole(user.app_metadata.role);
      }
      setLoading(false);
    }
    getSession();
  }, []);

  const handleNavigation = (targetRoute, requiredRole) => {
    if (userRole === requiredRole){
      navigate(targetRoute);
    } else {
      alert("You don't have permission to access this page.");
    }
  };
  if (loading){
    // IDK what to put here if i'm being honest
    return <div>Loading...</div>
  }

  // If no user is logged in, we should redirect them somewhere
  if (!userRole) {
    return <div>Please log in to view this content.</div>
  }

  return (
    <div className='view-permission'>
      <div className='top_tab_staffs'>
        {staffTabs.map((tab) => {
          const isActive = location.pathname === tab.route;

          return (
            <button
              key={tab.name}
              onClick={() => handleNavigation(tab.route, tab.role)}
              className={isActive ? 'tab active' : 'tab'}>
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ViewPermission;
