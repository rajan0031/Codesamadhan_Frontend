import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DocumentUpload from './Components/CreateFile';
import AllFilesCollection from './Components/AllFilesCollection/AllFilesCollection';
import ViewAParticularFile from './Components/ViewAParticularFile/ViewAParticularFile';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentUpload />} />
        <Route path="/AllFilesCollection" element={<AllFilesCollection />} />
        <Route path="/ViewAParticularFile" element={<ViewAParticularFile />} />
      </Routes>
    </Router>
  );
}

export default App;
