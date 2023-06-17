import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import LoginPage from './components/loginPage.tsx';
import ForgotPasswordPage from './components/forgotPasswordPage.tsx';
import MultiStepForm from './components/multistepForm.tsx';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <LoginPage/> */}
    {/* <ForgotPasswordPage/> */}
    <MultiStepForm/>
  </React.StrictMode>,
)
