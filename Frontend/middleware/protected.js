export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();

  console.log('Middleware: Initial isAuthenticated:', auth.isAuthenticated);

  if (!auth.isAuthenticated) {
    try {
      console.log('Middleware: Trying to refresh access token...');
      await auth.refreshAccessToken();
      
      if (!auth.isAuthenticated) {
        console.log('Middleware: Not authenticated after token refresh. Redirecting to /auth...');
        return navigateTo('/auth'); // Redirige si non authentifié après le refresh
      }

      console.log('Middleware: Fetching user data...');
      await auth.fetchUser();
    } catch (error) {
      console.error('Middleware: Error during authentication:', error.message);
      return navigateTo('/auth'); // Redirige en cas d'erreur
    }
  }
});

