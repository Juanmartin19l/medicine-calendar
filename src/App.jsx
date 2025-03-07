import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MedicinePage } from "./pages/MedicinePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MedicinePage />} />{" "}
        {/* Temporalmente, hasta crear HomePage */}
        <Route path="/medicines" element={<MedicinePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<MedicinePage />} />
      </Routes>
    </Router>
  );
}

export default App;
