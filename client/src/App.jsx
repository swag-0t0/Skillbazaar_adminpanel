import Home from "./pages/home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./pages/analytics/Analytics";

function App() {
  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
