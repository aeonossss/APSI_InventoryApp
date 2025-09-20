import FixedHeaderSidebar from '../FixedHeaderSidebar.js';
import ViewPermission from './ViewPermission.js';
import './StaffView.css';

function StaffView() {
    return(
        <div className='Orders-container'>
            <div className='background'>
                <FixedHeaderSidebar />
                <div className='main'>
                    <ViewPermission />
                    <div className="orders-table">
                        <div className="table-body">
                            <div className="table-header">
                            <div>Item ID</div>
                            <div>Date</div>
                            <div>Order ID</div>
                            <div>Customer</div>
                            <div>Total Price</div>
                            <div>Billing</div>
                        </div>

                        <div className="table-row">
                            <div>N/A</div>
                            <div>N/A</div>
                            <div>N/A</div>
                            <div>N/A</div>
                            <div>N/A</div>
                            <div>N/A</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default StaffView;