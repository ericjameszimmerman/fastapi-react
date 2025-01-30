import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './components/Login';
import { Projects } from './components/Projects';
import AuthService from './services/AuthService';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = AuthService.isAuthenticated();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <Router>
            <div className="App d-flex flex-column min-vh-100">
                <NavBar />
                <Container className="mt-4">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/projects"
                            element={
                                <ProtectedRoute>
                                    <Projects />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/"
                            element={<Navigate to="/projects" replace />}
                        />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
}

export default App;
