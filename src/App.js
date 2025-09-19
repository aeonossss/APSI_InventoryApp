import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.js'
import LoginPage from './LoginPage.js';
import Dashboard from './Dashboard.js';
import SignupPage from './SignupPage.js';
import Orders from './Orders.js';
import Items from './Items.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signuppage' element={<SignupPage />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/items' element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
