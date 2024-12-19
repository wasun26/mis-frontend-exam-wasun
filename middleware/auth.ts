export default defineNuxtRouteMiddleware((to, from) => {
  const accessToken = useCookie("accessToken");

  if (!accessToken.value && to.path !== "/login") {
    return navigateTo("/login");
  }

  if (accessToken.value && to.path === "/login") {
    return navigateTo("/blogs");
  }
});
