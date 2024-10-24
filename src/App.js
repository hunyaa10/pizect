import { BrowserRouter, Route, Routes } from "react-router-dom";
import Schedule from "./pages/Schedule";
import Works from "./pages/Works";
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="work" element={<Works />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
