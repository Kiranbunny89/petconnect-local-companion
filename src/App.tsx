import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Components
import { Navigation } from '@/components/Navigation';

// Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AllPetsPage } from '@/pages/AllPetsPage';
import { AddPetPage } from '@/pages/AddPetPage';
import { PetDetailsPage } from '@/pages/PetDetailsPage';
import { ContactPage } from '@/pages/ContactPage';

// Utils
import { getAuthState, initializeDefaultData } from '@/utils/storage';

const queryClient = new QueryClient();

const App = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize default data and handle browser navigation
    initializeDefaultData();
    setCurrentPath(window.location.pathname + window.location.search);
    
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    setIsInitialized(true);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (path: string) => {
    const { isLoggedIn } = getAuthState();
    const authRequiredPaths = ['/profile', '/add-pet', '/pets'];
    
    // Check if path requires authentication
    if (authRequiredPaths.includes(path) && !isLoggedIn) {
      window.history.pushState({}, '', '/login');
      setCurrentPath('/login');
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const renderPage = () => {
    const basePath = currentPath.split('?')[0]; // Remove query parameters for routing
    
    switch (basePath) {
      case '/':
        return <HomePage onNavigate={handleNavigate} />;
      case '/login':
        return <LoginPage onNavigate={handleNavigate} />;
      case '/register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case '/profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case '/pets':
        return <AllPetsPage onNavigate={handleNavigate} />;
      case '/add-pet':
        return <AddPetPage onNavigate={handleNavigate} />;
      case '/pet-details':
        return <PetDetailsPage onNavigate={handleNavigate} />;
      case '/contact':
        return <ContactPage onNavigate={handleNavigate} />;
      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-6">Page not found</p>
              <button
                onClick={() => handleNavigate('/')}
                className="text-primary hover:text-primary-hover underline"
              >
                Return to Home
              </button>
            </div>
          </div>
        );
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading PetConnect...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navigation onNavigate={handleNavigate} currentPath={currentPath.split('?')[0]} />
          <main>
            {renderPage()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
