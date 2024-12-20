import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import { PageLayout } from "./layouts/PageLayout";

function App() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default App;
