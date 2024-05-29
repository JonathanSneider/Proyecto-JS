import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './MainPage.jsx'
import './MainPage.css'
import UpdateCostForm from './formularios/costoIndirecto.jsx';
import RegisterCostForm from './formularios/createCosts.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <UpdateCostForm />
    <RegisterCostForm/>
  </React.StrictMode>,
)








      

