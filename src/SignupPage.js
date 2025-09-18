import './LoginPage.css'
import './Dashboard.js'
import { User, Mail, Lock, ShieldUser } from 'lucide-react';
import { Link, useNavigate } from'react-router-dom';

function SignupPage(){
    return(
        <div className='login-page'>
            <div className='bg-image'>
                <h1 className='title'>
                        Get started!
                    </h1>
                <div className='container-signup'>
                    <div className='overlay-gradient'>
                    <Textbox placeholder='Full Name' icon={User} />
                    <Textbox placeholder='Role' icon={ShieldUser} />
                    <Textbox placeholder='Email' icon={Mail} />
                    <Textbox placeholder='Password' icon={Lock}/>
                    <p className='centered-text'>
                        <i>Already a member?</i> <Link to="/loginpage"><b>Login</b></Link>
                    </p>
                    <br></br>
                    <br></br>
                    <Button label='Sign Up'/>
                    <div/>
                </div>
                </div>
            </div>
        </div>
    )
}

function Button({ label}){
    const nav = useNavigate();
    return(
        <button
        className='pink-buttons-long'
        onClick={() => nav('/dashboard')}>
            {label}
        </button>
    )
}

function Textbox({placeholder, icon: Icon}){
    return(
        <div className='textbox-wrapper'>
            {Icon && <Icon size={16} className="textbox-icon" />}
            <input 
            className='text-box'
            type='text'
            placeholder={placeholder}>
            </input>
        </div>
    );
}

export default SignupPage;