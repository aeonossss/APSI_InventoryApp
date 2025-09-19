import { BarChart3, ShoppingCart, Package, Users, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.js';
import FixedHeaderSidebar from './FixedHeaderSidebar.js';

function Items() {
    return(
        <div className="Items-container">
            <FixedHeaderSidebar />
            <div className="background">
                <div className="main">
                    
                </div>
            </div>
        </div>
    )
}

export default Items;