import { ChevronLeft, ChevronRight } from 'lucide-react';
import './App.js';
import './Items.css';
import FixedHeaderSidebar from './FixedHeaderSidebar.js';

function TeamLeadView() {
    
    const products = [
        
    ]

    const getStockBadge = (stock) => {
        let className = 'in-stock';

        if (stock === 'OUT OF STOCK') {
            className = 'out-of-stock';
        } 
        else if (!isNaN(stock)) {
    
            const stockNum = parseInt(stock, 10);
            if (stockNum < 100) className = 'low-stock';
            else className = 'in-stock';
        }
        return (
            <span className={`stock-badge ${className}`}>
            {stock}
        </span>
        );
    }

    return(
        <div className="Items-container">
            <FixedHeaderSidebar />
            <div className="background">
                <div className="main">
                    <div className="products-table">

          <div className="table-header-items">
            <div>Product Name</div>
            <div>Product ID</div>
            <div>Price</div>
            <div>Sales</div>
            <div>Stock</div>
          </div>

          <div className="table-body-items">
            {products.map((product, idx) => (
              <div key={idx} className="table-row-items">
                <div>{product.productName}</div>
                <div>{product.productID}</div>
                <div>{product.price}</div>
                <div>{product.sales}</div>
                <div>{getStockBadge(product.stock)}</div>
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
        </div>
    )
}

export default TeamLeadView;