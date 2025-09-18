import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage.js'
import LoginPage from './LoginPage.js';
import Dashboard from './Dashboard.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
