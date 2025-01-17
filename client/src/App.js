import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Forms/Login";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Forms/Register";
import AddTransaction from "./components/Forms/AddTransaction";
import Navbar from "./components/Navbar/Navbar";
import AccountDashboard from "./components/Dashboard/AccountDashboard";
import AccountDetails from "./components/Dashboard/AccountDetails";
import AddAccount from "./components/Forms/AddAccount";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-transaction/:id" element={<AddTransaction />} />
      <Route path="/dashboard" element={<AccountDashboard />} />
      <Route path="/account-details/:accountID" element={<AccountDetails />} />
      <Route path="/dashboard/accounts/create" element={<AddAccount />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;