import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Restaurants, Restaurant, Reservations, Favorites, Login, Register, Account } from "./pages/index"
import { AuthProvider } from "./components/auth/AuthProvider"

function App() {

  return (
    <>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/restaurants" />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<Restaurant />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Footer />
        </AuthProvider>
    </>
  )
}

export default App
