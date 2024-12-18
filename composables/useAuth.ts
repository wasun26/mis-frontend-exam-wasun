// export default () => {
//   const endpoint = "auth";
//   const api = useRestAPI<any>(endpoint);

//   return {
//     addAnnualAuditPeriod: async (body: Record<string, any>) => {
//       const { error } = await useIFetch(endpoint, {
//         method: "POST",
//         body,
//       });

//       if (error.value) {
//         throw createError({
//           statusCode: error.value.statusCode,
//           statusMessage: error.value.statusMessage,
//           fatal: true,
//         });
//       }
//     },

//     authLogin: async (body: Record<string, any> = {}) => {
//       const { data, error, refresh, pending } = await useIFetch<any[]>(
//         `${endpoint}/login`,
//         {
//           method: "POST",
//           body,
//           immediate: false,
//           watch: false,
//         }
//       );
//       if (error.value) {
//         throw createError({
//           statusCode: error.value.statusCode,
//           statusMessage: error.value.statusMessage,
//           fatal: true,
//         });
//       }
//       return { data, refresh, pending };
//     },
//   };
// };

// export const useAuth = () => {
//   const logout = async () => {
//     const accessToken = useCookie("accessToken");
//     accessToken.value = null;

//     await $fetch("api/auth/logout", { method: "DELETE" });

//     useIToast().onSuccess("Logout success");
//     navigateTo("/login");
//   };

//   return { logout };
// };

export const useAuth = () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch<any>("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });

      accessToken.value = response.accessToken;
      refreshToken.value = response.refreshToken;

      console.log("Login successful");
      navigateTo("/protected");
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid username or password");
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });

      accessToken.value = null;
      refreshToken.value = null;

      console.log("Logout successful");
      navigateTo("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      console.warn("No refresh token available");
      return;
    }

    try {
      const response = await $fetch<any>("/api/auth/refresh", {
        method: "POST",
        body: { refreshToken: refreshToken.value },
      });

      accessToken.value = response.accessToken;

      console.log("Access token refreshed successfully");
    } catch (error) {
      console.error("Failed to refresh access token", error);
      navigateTo("/login");
    }
  };

  const startAutoRefresh = () => {
    setInterval(() => {
      refreshAccessToken();
    }, 300000);
  };

  return {
    accessToken,
    refreshToken,
    login,
    logout,
    refreshAccessToken,
    startAutoRefresh,
  };
};
