import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, LogOut, User, Plus, Home, PawPrint } from 'lucide-react';
import { getAuthState, logout } from '@/utils/storage';

interface NavigationProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPath }) => {
  const { isLoggedIn, currentUser } = getAuthState();

  const handleLogout = () => {
    logout();
    onNavigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/pets', label: 'All Pets', icon: Heart, requiresAuth: true },
    { path: '/add-pet', label: 'Add Pet', icon: Plus, requiresAuth: true },
    { path: '/profile', label: 'Profile', icon: User, requiresAuth: true },
    { path: '/contact', label: 'Contact', icon: PawPrint },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => onNavigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-hero rounded-xl flex items-center justify-center shadow-warm">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">PetConnect</h1>
              <p className="text-xs text-muted-foreground">Find Your Perfect Pet</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.requiresAuth && !isLoggedIn) return null;
              
              return (
                <Button
                  key={item.path}
                  variant={currentPath === item.path ? 'hero' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-foreground">
                    Welcome, {currentUser?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentUser?.email}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="hero"
                  size="sm"
                  onClick={() => onNavigate('/register')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isLoggedIn && (
          <div className="md:hidden mt-3 flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => {
              if (item.requiresAuth && !isLoggedIn) return null;
              
              return (
                <Button
                  key={item.path}
                  variant={currentPath === item.path ? 'hero' : 'ghost'}
                  size="sm"
                  onClick={() => onNavigate(item.path)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};