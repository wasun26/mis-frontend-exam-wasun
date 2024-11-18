import type { UseFetchOptions } from "#app";

export const useIFetch = <T>(
  endpoint: string,
  options: UseFetchOptions<T> = {},
  customPath?: string
) => {
  const config = useRuntimeConfig();
  const baseURL = `${config.public.apiBase}${
    customPath ?? config.public.apiPath
  }`;
  const accessToken = useCookie("accessToken");

  const defaults: UseFetchOptions<T> = {
    baseURL,
    retryStatusCodes: [401],
    retry: 1,
    watch: false,
    onRequest: async ({ request, options }) => {
      if (!!accessToken.value) {
        options.headers = { Authorization: `Bearer ${accessToken.value}` };
      } else {
        const accessToken = localStorage.getItem("accessToken");
        if (!!accessToken) {
          options.headers = { Authorization: `Bearer ${accessToken}` };
        }
      }
    },
    onResponseError: async ({ response, options }) => {
      if (response.status === 401 && !accessToken.value) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          options.headers = { Authorization: `Bearer ${accessToken}` };
        } catch (error) {}
      }
    },
  };

  const params = useMerge(options, defaults);

  return useFetch(endpoint, params);
};
