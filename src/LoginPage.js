import './LoginPage.css'
import './Dashboard.js'
import './SignupPage.js'
import { User, Mail, Lock, ShieldUser, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from './supabaseClient.js';
import { validateEmail, validateLoginForm } from './Components/validation.js';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const formErrors = validateLoginForm({ email, password });
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    // Handle login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setErrors({});
        
        // Validate form before submission
        if (!validateForm()) {
        return;
        }

        setIsLoading(true);

        try {
        // Sign in the user with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Error logging in:', error.message);
            
            // Handle specific error types
            if (error.message.includes('Invalid login credentials')) {
            setErrors({ submit: 'Invalid email or password. Please try again.' });
            } else if (error.message.includes('Email not confirmed')) {
            setErrors({ submit: 'Please check your email and confirm your account before logging in.' });
            } else if (error.message.includes('Too many requests')) {
            setErrors({ submit: 'Too many login attempts. Please wait a moment and try again.' });
            } else {
            setErrors({ submit: error.message });
            }
        } else {
            console.log('User logged in: ', data);
            
            // Check if user session is valid
            if (data.user && data.session) {
            // Successful login - navigate to dashboard
            navigate('/dashboard');
            } else {
            setErrors({ submit: 'Login failed. Please try again.' });
            }
        }
        } catch (error) {
        console.error('Unexpected error:', error);
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        } finally {
        setIsLoading(false);
        }
    };

    // Handle "Forgot Password" functionality
    const handleForgotPassword = async () => {
        if (!email.trim()) {
        setErrors({ email: 'Please enter your email address first' });
        return;
        }

        if (!validateEmail(email)) {
        setErrors({ email: 'Please enter a valid email address' });
        return;
        }

        setIsLoading(true);
        
        try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
            setErrors({ submit: 'Error sending reset email. Please try again.' });
        } else {
            alert('Password reset email sent! Check your inbox.');
            setErrors({});
        }
        } catch (error) {
        setErrors({ submit: 'An unexpected error occurred. Please try again.' });
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div className='login-page'>
        <div className='bg-image'>
            <h1 className='title'>Welcome back!</h1>
            <div className='container-login'>
            <div className='overlay-gradient'>
                <form onSubmit={handleLogin}>
                <Textbox 
                    placeholder='Email' 
                    icon={Mail}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                />
                
                <PasswordInput 
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

                <ForgotPasswordButton 
                    onForgotPassword={handleForgotPassword}
                    isLoading={isLoading}
                />

                <p className='centered-text'>
                    <i>Not a member yet?</i> <Link to="/signuppage"><b>Sign Up</b></Link>
                </p>
                <br />
                <br />
                
                <Button 
                    label={isLoading ? 'Logging in...' : 'Login'}
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

    function PasswordInput({ placeholder, icon: Icon, value, onChange, error }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='textbox-wrapper'>
        <div className={`textbox-container ${error ? 'error' : ''}`}>
            {Icon && <Icon size={16} className="textbox-icon" />}
            <input 
            className='text-box'
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            />
            <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
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

    function ForgotPasswordButton({ onForgotPassword, isLoading }) {
    return (
        <div className="forgot-password-link">
        <button 
            type="button"
            className="link-button"
            onClick={onForgotPassword}
            disabled={isLoading}
        >
            Forgot Password?
        </button>
        </div>
    );
    }

export default LoginPage;