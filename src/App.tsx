import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { PageLayout } from "./layouts/PageLayout";
import { useState, useEffect } from "react";

function App() {
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <PageLayout
        isMobileView={isMobileView}
        selectedCharacter={selectedCharacter}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onCharacterSelect={(selected) =>
                  setSelectedCharacter(!!selected)
                }
                isMobileView={isMobileView}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                onCharacterSelect={(selected) =>
                  setSelectedCharacter(!!selected)
                }
                isMobileView={isMobileView}
              />
            }
          />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
