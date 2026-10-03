import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import About from "./pages/About"
import Cart from "./pages/Cart"
import Collections from "./pages/Collections"
import Contact from "./pages/Contact"
import Order from "./pages/Order"
import PlaceOrder from "./pages/PlaceOrder"
import Product from "./pages/Product"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
