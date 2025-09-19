import './LoginPage.css'
import './Dashboard.js'
import { User, Mail, Lock, ShieldUser, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from'react-router-dom';
import { useState } from 'react';

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
                    <DropdownButton icon={ShieldUser}/>
                    <Textbox placeholder='Email' icon={Mail} />
                    <Password placeholder='Password' icon={Lock}/>
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

function Password({placeholder, icon: Icon}){
    return(
        <div className='textbox-wrapper'>
            {Icon && <Icon size={16} className="textbox-icon" />}
            <input 
            className='text-box'
            type='password'
            placeholder={placeholder}>
            </input>
        </div>
    );
}


const DropdownButton = ({icon: Icon}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Role');

  const options = [
    'CSR',
    'Team Lead', 
    'Accounting',
    'Warehouse Staff',
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-wrapper">
        <button
          className={`dropdown-button ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
            {Icon && <Icon size={16} className="textbox-icon" />}
          <span>{selectedOption}</span>
          <ChevronDown size={20} className={`chevron ${isOpen ? 'rotate' : ''}`} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;