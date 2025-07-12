import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Index";
import Layout from "./pages/Layout";

import Builds from "./pages/builds/Builds";
import BuildSteps from "./pages/builds/BuildSteps";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore-builds" element={<Builds />} />
          <Route path="/build/:id" element={<BuildSteps />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
