import './App.css'
import LoginRegisterPage from './pages/LoginRegisterPage.jsx'
import CustomerRegistrationForm from './pages/CustomerRegPage.jsx'
import CustomerRegChatbot from './pages/Chatbot/CustomerRegChatbot.jsx'
import TravelRecommChatbot from './pages/Chatbot/TravelRecommChatbot.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <Toaster  position="top-right"  duration={2000} />
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LoginRegisterPage />} />
        {/* <Route path="/login" element={<LoginRegisterPage />} /> */}
        <Route path="/chatbotcr" element={<CustomerRegChatbot />} />
        <Route path="/chatbottr" element={<TravelRecommChatbot />} />
        <Route path="/customerreg" element={<CustomerRegistrationForm />} />
        <Route path="/*" element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
