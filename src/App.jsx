import './App.css'
import LoginRegisterPage from './pages/LoginRegisterPage.jsx'
import CustomerRegistrationForm from './pages/CustomerRegPage.jsx'
import CustomerRegChatbot from './pages/Chatbot/CustomerRegChatbot.jsx'
import TravelRecommChatbot from './pages/Chatbot/TravelRecommChatbot.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard/Home.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
function App() {
  return (
    <>
    <Toaster  position="top-right"  duration={2000} />
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LoginRegisterPage />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/chatbotcr" element={<CustomerRegChatbot />} />
        <Route path="/chatbottr" element={<TravelRecommChatbot />} />
        <Route path="/customerreg" element={<CustomerRegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
