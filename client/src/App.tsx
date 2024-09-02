import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import { Navbar } from "./components/navbar";
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { ShopPage } from "./pages/shop";
import { PurchasedItemsPage } from "./pages/purchased-items";

function App() {

  return (
   <div className="w-full mx-auto px-[5%] py-10 h-screen">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ShopPage/>}/>
        <Route path="/auth" element={<AuthPage/>} />
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/purchased-items" element={<PurchasedItemsPage/>}/>

      </Routes>
    </Router>

   </div>
  )
}

export default App
