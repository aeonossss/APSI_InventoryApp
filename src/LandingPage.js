import './LandingPage.css'
import './LoginPage.js'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const nav = useNavigate();
    return (
        <div className='body'>
            <div className='bg-image'>
                <div className='container'>
                    <h1 className='title'>ShowCase Inventory<br></br> Management</h1>
                    <p><i>Manage your inventory, staff, and transactions, all in one click.</i></p>
                    <button className='pink-buttons' onClick={() => nav('/loginpage')}>
                        Get Started
                    </button>                      
                </div>            
            </div>
        </div>
    );
}

export default LandingPage;