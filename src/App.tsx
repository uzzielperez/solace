import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Program21 from './pages/Program21';
import Kintsugi from './pages/Kintsugi';
import Timeline from './pages/Timeline';
import Journal from './pages/Journal';
import Honor from './pages/Honor';
import GuidedReflection from './pages/GuidedReflection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reflect" element={<GuidedReflection />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/program" element={<Program21 />} />
              <Route path="/kintsugi" element={<Kintsugi />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/honor" element={<Honor />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
