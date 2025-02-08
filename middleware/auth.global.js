export default defineNuxtRouteMiddleware((to, from) => {
  // Check if we are on the client side
  if (process.server) return;

  const publicPaths = ['/login', '/register'];
  const token = useCookie('token', { default: () => '' }).value;
  
  if (!token && !publicPaths.includes(to.path)) {
    return navigateTo('/login');
  }
});
