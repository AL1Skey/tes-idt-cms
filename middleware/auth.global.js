export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on the client side.
  if (import.meta.server) return;

  const publicPaths = ['/login', '/register'];
  // Get the token as a reactive ref.
  const token = useCookie('token', { default: () => '' });
  const config = useRuntimeConfig();

  // If there is no token and the current route is not public, redirect to /login.
  if (!token.value && !publicPaths.includes(to.path)) {
    return navigateTo('/login');
  }

  // If a token exists and we're not on a public route, verify it.
  if (token.value && !publicPaths.includes(to.path)) {
    try {
      const { error } = await useFetch(`${config.public.apiBase}/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });
      // Check if the fetch response contains an error.
      if (error.value) {
        token.value = '';
        return navigateTo('/login');
      }
    } catch (err) {
      // On verification failure (e.g. expired token), clear the token and redirect.
      token.value = '';
      return navigateTo('/login');
    }
  }
});
