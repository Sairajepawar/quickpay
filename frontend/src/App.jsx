import {Route,Routes,BrowserRouter} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'
import Send from './pages/Send'
import Signup from './pages/Signup'
function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/send/:id" element={<Send/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
