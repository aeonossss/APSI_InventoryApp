import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../Items.css';
import FixedHeaderSidebar from '../FixedHeaderSidebar.js';
import ViewPermission from './ViewPermission.js';

function AccountingView() {
    const products = [
        {productName: 'Sodapop Candy Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: 'OUT OF STOCK'},
        {productName: 'Amber Vein Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: 'OUT OF STOCK'},
        {productName: 'Cursed Feather Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: '297'},
        {productName: 'Twinborn Sky White Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: '57'},
        {productName: 'Sodapop Candy Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: '120'},
        {productName: 'Amber Vein Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: '85'},
        {productName: 'Cursed Feather Case', productID: '#01234', price: '$79.25', sales: '$23,356.25', stock: '300'}
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
                    <ViewPermission />
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

export default AccountingView;