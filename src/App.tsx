import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { PageLayout } from "./layouts/PageLayout";

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
