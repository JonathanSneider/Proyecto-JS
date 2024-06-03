import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './MainPage.jsx'
import './css/MainPage.css' 
import MaterialManager from './formularios/MaterialManager.jsx'
import CostManager from  './formularios/costsManager.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

)

