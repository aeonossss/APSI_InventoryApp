import './LandingPage.css'
import './LoginPage.js'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const nav = useNavigate();
    return (
        <div className='body'>
            <div className='bg-image'>
                <h1>Landing Page</h1>
                <button onClick={() => nav('/loginpage')}>
                    Login Page
                </button>
            </div>
        </div>
    );
}

export default LandingPage;