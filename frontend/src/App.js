// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from "./pages/login-signup";
import Mail from "./pages/mail";
import SendEmail from './components/sendMailForm';
const apiUrl = process.env.REACT_APP_API_URL;

function App() {
  console.log(process.env.REACT_APP_API_URL);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/mail/*" element={<Mail />} />
          <Route path="/send-email" element={<SendEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;