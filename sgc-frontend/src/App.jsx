import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import RendezVous from './pages/RendezVous';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="py-4">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="/clients" element={
                                <ProtectedRoute>
                                    <Clients />
                                </ProtectedRoute>
                            } />
                            
                            <Route path="/rendez-vous" element={
                                <ProtectedRoute>
                                    <RendezVous />
                                </ProtectedRoute>
                            } />

                            <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
