import './LoginPage.css'
import './Dashboard.js'
import { User, Mail, Lock, ShieldUser, ChevronDown, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from './Supabase/supabaseClient';
import { validateSignupForm } from './Components/validation.js';

function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const formErrors = validateSignupForm({ fullName, email, password, role });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // The handler for the form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Sign up the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            fullName: fullName,
            role: role,
          }
        }
      });

      if (error) {
        console.error('Error signing up:', error.message);
        setErrors({ submit: error.message });
      } else {
        console.log('User signed up: ', data);
        // Only navigate to dashboard on successful signup
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-page'>
      <div className='bg-image'>
        <h1 className='title'>Get started!</h1>
        <div className='container-signup'>
          <div className='overlay-gradient'>
            <form onSubmit={handleSignup}>
              <Textbox 
                placeholder='Full Name' 
                icon={User} 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
              />
              
              <DropdownButton 
                icon={ShieldUser} 
                selectedOption={role} 
                onSelectOption={setRole}
                error={errors.role}
              />
              
              <Textbox 
                placeholder='Email' 
                icon={Mail} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                type="email"
              />
              
              <Password 
                placeholder='Password' 
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              {errors.submit && (
                <div className="error-message submit-error">
                  <AlertCircle size={16} />
                  <span>{errors.submit}</span>
                </div>
              )}

              <p className='centered-text'>
                <i>Already a member?</i> <Link to="/loginpage"><b>Login</b></Link>
              </p>
              <br />
              <br />
              
              <Button 
                label={isLoading ? 'Signing Up...' : 'Sign Up'}
                type="submit"
                disabled={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button({ label, type = "button", disabled = false, onClick }) {
  return (
    <button
      className={`pink-buttons-long ${disabled ? 'disabled' : ''}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function Textbox({ placeholder, icon: Icon, value, onChange, error, type = "text" }) {
  return (
    <div className='textbox-wrapper'>
      <div className={`textbox-container ${error ? 'error' : ''}`}>
        {Icon && <Icon size={16} className="textbox-icon" />}
        <input 
          className='text-box'
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

function Password({ placeholder, icon: Icon, value, onChange, error }) {
  return (
    <div className='textbox-wrapper'>
      <div className={`textbox-container ${error ? 'error' : ''}`}>
        {Icon && <Icon size={16} className="textbox-icon" />}
        <input 
          className='text-box'
          type='password'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

const DropdownButton = ({ icon: Icon, selectedOption, onSelectOption, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    'CSR',
    'Team Lead', 
    'Accounting',
    'Warehouse Staff',
  ];

  const handleOptionClick = (option) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-wrapper">
        <button
          type="button"
          className={`dropdown-button ${isOpen ? 'open' : ''} ${error ? 'error' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {Icon && <Icon size={16} className="textbox-icon" />}
          <span>{selectedOption || 'Role'}</span>
          <ChevronDown size={20} className={`chevron ${isOpen ? 'rotate' : ''}`} />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                className="dropdown-item"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <div className="error-message">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SignupPage;