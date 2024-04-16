import { Navigate, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Restaurants, Reservations, Favorites } from "./pages/index.ts"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/restaurants" />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App
