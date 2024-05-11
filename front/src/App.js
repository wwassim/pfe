import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Affectation from "./pages/Affectation";
import Recuperation from "./pages/Recuperation";
import AddAff from "./pages/AddAffe";
import AddRecup from "./pages/AddRecup";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

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
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
