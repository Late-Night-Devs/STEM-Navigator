import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Home from "./components/Home.jsx";
import Events from "./components/Events.jsx";
import Scholarship from "./components/Scholarship.jsx";
import Calender from "./components/Calender.jsx";
import ProgramTab from "./components/ProgramPage/ProgramTab.jsx";
import Newsletter from "./components/Newsletter.jsx";
import AdminPage from "./components/AdminPage/AdminPage.jsx";
import Profile from "./components/Auth0/testingProfile.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/program" element={<ProgramTab />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/admin-modify-db" element={<AdminPage />} />
        <Route path="/profile-testing" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;