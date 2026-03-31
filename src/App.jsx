import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './layouts/Layout';
import { InstallationProvider } from './context/InstallationContext';

const Home = lazy(() => import('./pages/Home'));
const AllApps = lazy(() => import('./pages/AllApps'));
const AppDetails = lazy(() => import('./pages/AppDetails'));
const MyInstallation = lazy(() => import('./pages/MyInstallation'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Loading = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <InstallationProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="apps" element={<AllApps />} />
              <Route path="app/:id" element={<AppDetails />} />
              <Route path="installation" element={<MyInstallation />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster position="bottom-right" />
      </Router>
    </InstallationProvider>
  );
}

export default App;
