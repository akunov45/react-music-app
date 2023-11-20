import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './global.module.scss'
import AudioProvider from "./context/AudioContext.jsx";

const rootDiv = document.getElementById('root')

createRoot(rootDiv).render(
  <AudioProvider>
    <App />
  </AudioProvider>,
)
