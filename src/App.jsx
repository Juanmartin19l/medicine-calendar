import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";

// Lazy loaded components
const HomePage = lazy(() => import("./pages/HomePage"));
const MedicinePage = lazy(() => import("./pages/MedicinePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1e1e24] to-[#222222]">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-300">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router basename="/medicine-calendar">
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/medicines" element={<MedicinePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Route to handle not found pages */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
