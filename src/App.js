// import logo from './logo.svg';
import './App.css';
import Home from './pages/home/home';
import Signup from './pages/signup/signup';
import Login from './pages/login/login';
import Doctor from "./pages/doctor/doctor";
import Profile from "./components/profile/profile";
import CreateAppointment from "./components/Doctor/CreateAppointment";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/doctor' element={<Doctor />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/createAppointment' element={<CreateAppointment />}/>
        {/* <Route path="/createAppointment" element={<div>Test Page</div>} /> */}

      </Routes>
    </BrowserRouter> 
    
  );
}

export default App;
