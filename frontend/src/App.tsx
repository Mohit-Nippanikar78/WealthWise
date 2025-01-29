import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from './context/ThemeContext';
import { TourProvider } from './context/TourContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import MyData from './pages/MyData/index';
import Recommendations from './pages/Recommendations';
import Learn from './pages/Learn';
import Profile from './pages/Profile';
import AuthComponent from './components/AuthComponent';
import DashboardLayout from './components/DashboardLayout';
import FinancialPathFlow from './components/FinancialPathFlow';
import Chatbot from './pages/Chatbot';
import MoneyPulse from './components/MoneyPulse';
import MoneyCalc from './components/MoneyCalc';
import StockAnalyzer from './pages/StockAnalyzer';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemeProvider>
        <TourProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/" element={<><Navbar /><Home /></>} />
                <Route path="/sign-in" element={<AuthComponent />} />
                <Route path="/sign-up" element={<AuthComponent />} />
                <Route path="/portfolio" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Portfolio />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/my-data" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MyData />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/recommendations" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Recommendations />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/learn" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Learn />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/profile" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Profile />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/financial-path" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <FinancialPathFlow />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/chatbot" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <Chatbot />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/money-pulse" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MoneyPulse />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/money-calc" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <MoneyCalc />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
                <Route path="/portfolio/stock-analyzer" element={
                  <ProtectedRoute>
                    <DashboardLayout>
                      <StockAnalyzer />
                    </DashboardLayout>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </Router>
        </TourProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;