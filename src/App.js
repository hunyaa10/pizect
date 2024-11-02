import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Works from "./pages/Works";
import Nav from "./components/Nav";
import { NavProvider } from "./NavContext";

function App() {
  return (
    <BrowserRouter>
      <NavProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="work" element={<Works />} />
        </Routes>
      </NavProvider>
    </BrowserRouter>
  );
}

export default App;
