import { useState, useEffect } from 'react';
import './Dashboard.css';
import './App';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import FixedHeaderSidebar from './FixedHeaderSidebar';
import { supabase } from './supabaseClient';

const Dashboard = () => {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('Warehouse');

  // State for tables
  const [warehouse, setWarehouse] = useState([]);
  const [staff, setStaff] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load data on tab switch
  useEffect(() => {
    if (activeTab === 'Warehouse') fetchWarehouse();
    if (activeTab === 'Staff') fetchStaff();
    if (activeTab === 'Orders') fetchOrders();
  }, [activeTab]);

  // --- FETCH FUNCTIONS ---
  const fetchWarehouse = async () => {
    let { data, error } = await supabase.from('Warehouse').select('*');
    if (error) console.error(error);
    else setWarehouse(data);
  };

  const fetchStaff = async () => {
    let { data, error } = await supabase.from('Staff').select('*');
    if (error) console.error(error);
    else setStaff(data);
  };

  const fetchOrders = async () => {
    let { data, error } = await supabase.from('Order').select('*');
    if (error) console.error(error);
    else setOrders(data);
  };

  // --- CRUD EXAMPLES ---
  const addWarehouse = async () => {
    const { error } = await supabase.from('Warehouse').insert([
      { item_id: 1, transaction_date: new Date(), transaction_type: true, quantity: 50 }
    ]);
    if (error) console.error(error);
    fetchWarehouse();
  };

  const deleteStaff = async (id) => {
    const { error } = await supabase.from('Staff').delete().eq('staff_id', id);
    if (error) console.error(error);
    fetchStaff();
  };

  const updateOrder = async (id, newAmount) => {
    const { error } = await supabase.from('Order').update({ amount: newAmount }).eq('order_id', id);
    if (error) console.error(error);
    fetchOrders();
  };

  const tabs = ['Warehouse', 'Staff', 'Orders'];

  return (
    <div className="background">
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
        <FixedHeaderSidebar />
        <div className="main">
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
              {activeTab === 'Warehouse' && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {warehouse.map((w) => (
                        <tr key={w.transaction_id}>
                          <td>{w.transaction_id}</td>
                          <td>{w.item_id}</td>
                          <td>{w.transaction_date}</td>
                          <td>{w.transaction_type ? 'IN' : 'OUT'}</td>
                          <td>{w.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {activeTab === 'Staff' && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.map((s) => (
                        <tr key={s.staff_id}>
                          <td>{s.staff_id}</td>
                          <td>{s.staff_name}</td>
                          <td>{s.role}</td>
                          <td>
                            <button onClick={() => deleteStaff(s.staff_id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {activeTab === 'Orders' && (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.order_id}>
                          <td>{o.order_id}</td>
                          <td>{o.customer_name}</td>
                          <td>{o.amount}</td>
                          <td>
                            <button onClick={() => updateOrder(o.order_id, o.amount + 100)}>
                              +100
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
