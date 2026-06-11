import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateVM from "./pages/CreateVM";
import VMDetails from "./pages/VMDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateVM />} />
        <Route path="/vm/:id" element={<VMDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
