import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MedicinePage } from "./pages/MedicinePage";
// import { AboutPage } from "./pages/AboutPage"; // Descomenta cuando crees la página About

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/medicines" element={<MedicinePage />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
