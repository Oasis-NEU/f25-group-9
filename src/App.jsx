import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import ProfilePage from './pages/ProfilePage';
import AnalysisPage from './pages/AnalysisPage';
import PostPage from './pages/PostPage';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/launch" element={<LaunchPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Createaccount" element={<CreateAccountPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
