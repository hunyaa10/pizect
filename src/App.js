import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Works from "./pages/Works";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { NavProvider } from "./NavContext";

function App() {
  return (
    <BrowserRouter>
      <NavProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="work" element={<Works />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </NavProvider>
    </BrowserRouter>
  );
}

export default App;
