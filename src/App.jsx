import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import DayDetail from './pages/DayDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/day/:dayIndex" element={<DayDetail />} />
      </Routes>
    </Router>
  )
}

export default App
