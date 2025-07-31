// Simple client-side routing for PetConnect
export type RouteParams = Record<string, string>;

export interface Route {
  path: string;
  component: () => void;
  requiresAuth?: boolean;
}

class Router {
  private routes: Route[] = [];
  private currentPath: string = '/';

  addRoute(path: string, component: () => void, requiresAuth = false): void {
    this.routes.push({ path, component, requiresAuth });
  }

  navigate(path: string): void {
    this.currentPath = path;
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  back(): void {
    window.history.back();
  }

  private handleRoute(): void {
    const route = this.routes.find(r => r.path === this.currentPath);
    if (route) {
      if (route.requiresAuth && !this.isAuthenticated()) {
        this.navigate('/login');
        return;
      }
      route.component();
    } else {
      // Handle 404 or redirect to home
      this.navigate('/');
    }
  }

  private isAuthenticated(): boolean {
    const auth = localStorage.getItem('petconnect_auth');
    if (!auth) return false;
    const authState = JSON.parse(auth);
    return authState.isLoggedIn;
  }

  init(): void {
    window.addEventListener('popstate', () => {
      this.currentPath = window.location.pathname;
      this.handleRoute();
    });
    
    this.currentPath = window.location.pathname;
    this.handleRoute();
  }

  getCurrentPath(): string {
    return this.currentPath;
  }
}

export const router = new Router();

// Navigation helpers
export const navigateTo = (path: string): void => {
  router.navigate(path);
};

export const goBack = (): void => {
  router.back();
};

// Initialize router when DOM is loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    router.init();
  });
}