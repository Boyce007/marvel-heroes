import { BrowserRouter,Routes,Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import HeroDetails from "./pages/HeroDetails";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashBoard/>}/>
      <Route path="/details:id" element={<HeroDetails/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
