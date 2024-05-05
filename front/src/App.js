import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Affectation from "./pages/Affectation";
import Recuperation from "./pages/Recuperation";
import AddAff from "./pages/AddAffe";
import AddRecup from "./pages/AddRecup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/affectation" element={<Affectation />} />
          <Route path="/affectation/add" element={<AddAff />} />
          <Route path="/recuperation" element={<Recuperation />} />
          <Route path="/recuperation/add" element={<AddRecup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
