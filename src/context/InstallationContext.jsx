import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const InstallationContext = createContext();

export const InstallationProvider = ({ children }) => {
  const [installedApps, setInstalledApps] = useState(() => {
    const saved = localStorage.getItem('installedApps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('installedApps', JSON.stringify(installedApps));
  }, [installedApps]);

  const installApp = (app) => {
    if (!installedApps.find(a => a.id === app.id)) {
      setInstalledApps(prev => [...prev, app]);
      toast.success('App installed successfully!');
    }
  };

  const uninstallApp = (appId) => {
    setInstalledApps(prev => prev.filter(a => a.id !== appId));
    toast.success('App uninstalled successfully!');
  };

  const isInstalled = (appId) => {
    return installedApps.some(a => a.id === appId);
  };

  return (
    <InstallationContext.Provider value={{ installedApps, installApp, uninstallApp, isInstalled }}>
      {children}
    </InstallationContext.Provider>
  );
};

export const useInstallation = () => {
  const context = useContext(InstallationContext);
  if (!context) {
    throw new Error('useInstallation must be used within an InstallationProvider');
  }
  return context;
};
