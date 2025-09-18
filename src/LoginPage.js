import './LoginPage.css'
import './Dashboard.js'
import { useNavigate } from'react-router-dom';

function LoginPage(){
    return(
        <div className='bg-image'>
            <h1 className='title'>
                Get started
            </h1>
        <Button />
        </div>
    )
}

function Button(){
    const nav = useNavigate();
    return(
        <button onClick={() => nav('/dashboard')}>
            Login
        </button>
    )
}

export default LoginPage;