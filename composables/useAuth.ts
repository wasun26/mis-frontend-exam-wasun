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

//----------------------------------------------------------------
// export const useAuth = () => {
//   const accessToken = useCookie("accessToken", { maxAge: 300 });
//   const refreshToken = useCookie("refreshToken");
//   const expires_in = useCookie("expires_in");

//   const user = ref<any>(null);

//   const runtimeConfig = useRuntimeConfig();

//   const login = async (username: string, password: string) => {
//     try {
//       const response = await $fetch<any>(
//         `${runtimeConfig.public.apiBase}/api/auth/login`,
//         {
//           method: "POST",
//           body: { username, password },
//         }
//       );

//       accessToken.value = response.access_token;
//       expires_in.value = response.expires_in;
//       refreshToken.value = response.refresh_token;

//       navigateTo("/blogs");
//     } catch (error) {
//       console.error("Login failed", error);
//       throw new Error("Invalid username or password");
//     }
//   };

//   const fetchUser = async () => {
//     if (!accessToken.value) return;

//     try {
//       const response = await $fetch(`${runtimeConfig.public.apiBase}/auth/me`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken.value}`,
//         },
//       });

//       user.value = response;
//     } catch (error: any) {
//       console.error("Fetch user failed:", error);
//       if (error.response?.status === 401) {
//         await refreshAccessToken();
//       }
//     }
//   };

//   const logout = async () => {
//     try {
//       await $fetch("https://exam-api.dev.mis.cmu.ac.th/api/auth/logout", {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",

//           Authorization: "Bearer " + useCookie("accessToken"),
//         },
//       });

//       accessToken.value = null;
//       refreshToken.value = null;

//       console.log("Logout successful");
//       navigateTo("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   const refreshAccessToken = async () => {
//     if (!refreshToken.value) {
//       console.warn("No refresh token available");
//       return;
//     }

//     try {
//       const response = await $fetch<any>("/api/auth/refresh", {
//         method: "POST",
//         body: { refreshToken: refreshToken.value },
//       });

//       accessToken.value = response.accessToken;

//       console.log("Access token refreshed successfully");
//     } catch (error) {
//       console.error("Failed to refresh access token", error);
//       navigateTo("/login");
//     }
//   };

//   const startAutoRefresh = () => {
//     setInterval(() => {
//       refreshAccessToken();
//     }, 300000);
//   };

//   return {
//     accessToken,
//     refreshToken,
//     login,
//     logout,
//     refreshAccessToken,
//     startAutoRefresh,
//   };
// };

// ----------------------------------------------------------------
export const useAuth = () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  const expires_in = useCookie("expires_in");

  const user = ref<any>(null);
  const runtimeConfig = useRuntimeConfig();

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch<any>(
        `${runtimeConfig.public.apiBase}/api/auth/login`,
        {
          method: "POST",
          body: { username, password },
        }
      );

      accessToken.value = response.access_token;
      refreshToken.value = response.refresh_token;
      expires_in.value = (
        new Date().getTime() +
        response.expires_in * 1000
      ).toString();

      navigateTo("/blogs");
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Invalid username or password");
    }
  };

  const fetchUser = async () => {
    if (!accessToken.value) return;

    try {
      const response = await $fetch(
        `${runtimeConfig.public.apiBase}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        }
      );

      user.value = response;
    } catch (error: any) {
      console.error("Fetch user failed:", error);
      if (error.response?.status === 401) {
        await refreshAccessToken();
      }
    }
  };

  const logout = async () => {
    try {
      await $fetch(`${runtimeConfig.public.apiBase}/api/auth/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      });

      accessToken.value = null;
      refreshToken.value = null;
      expires_in.value = null;

      useIToast().onSuccess("ออกจากระบบสำเร็จ");
      navigateTo("/login");
    } catch (error) {
      useIToast().onError("ออกจากระบบไม่สำเร็จ");
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken.value) {
      console.warn("No refresh token available");
      navigateTo("/login");
      return;
    }

    try {
      const response = await $fetch<any>(
        `${runtimeConfig.public.apiBase}/api/auth/refresh`,
        {
          method: "POST",
          body: { refresh_token: refreshToken.value },
        }
      );

      accessToken.value = response.access_token;
      expires_in.value = (
        new Date().getTime() +
        response.expires_in * 1000
      ).toString();
    } catch (error) {
      console.error("Failed to refresh access token", error);
      logout();
    }
  };

  const startAutoRefresh = () => {
    setInterval(async () => {
      const now = new Date().getTime();
      if (expires_in.value && now > parseInt(expires_in.value, 10) - 60000) {
        await refreshAccessToken();
      }
    }, 30000);
  };

  return {
    accessToken,
    refreshToken,
    login,
    logout,
    fetchUser,
    refreshAccessToken,
    startAutoRefresh,
  };
};
