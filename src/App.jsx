import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css'
import ProfilePage from './pages/ProfilePage';
import AnalysisPage from './pages/AnalysisPage';
import PostPage from './pages/PostPage';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import { supabase } from '../supabase.js';
import React, { useState, useEffect } from 'react';

function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // auth changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="*" 
            element={session ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
          />
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
