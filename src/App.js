import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Works from "./pages/Works";
import { NavProvider } from "./context/NavContext";
import Home from "./pages/Home";
import NavVisibility from "./components/NavVisibility";
import Main from "./pages/Main";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavProvider>
          <NavVisibility />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main" element={<Main />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/work" element={<Works />} />
          </Routes>
        </NavProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
