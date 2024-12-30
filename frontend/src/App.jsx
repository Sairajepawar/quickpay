import {Route,Routes,BrowserRouter} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Login from './pages/Login.jsx'
import Send from './pages/Send'
import Signup from './pages/Signup'
import Transaction from "./pages/Transaction.jsx"

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Dashboard/>} />
            <Route path="/send/:id/:full_name" element={<Send/>} />
            <Route path="/history" element={<Transaction/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
