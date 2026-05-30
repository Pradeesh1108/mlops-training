import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DetectionProvider } from './context/DetectionContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <DetectionProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col dark:bg-dark-bg bg-light-bg transition-colors duration-300">
              <Navbar />
              <main className="flex-1 pt-16">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </BrowserRouter>
      </DetectionProvider>
    </ThemeProvider>
  );
}
