export const useRestAPI = <DataT>(endpoint: string) => {
  const pagination = (query: Record<string, any> = {}) => {
    return useIFetch<ListPage<DataT>>(endpoint, { query });
  };
  const paginationPost = (
    query: Record<string, any> = {},
    body: Record<string, any> = {}
  ) => {
    return useIFetch<ListPage<DataT>>(endpoint, {
      method: "POST",
      query,
      body,
    });
  };
  const all = (query: Record<string, any> = {}) => {
    return useIFetch<DataT[]>(endpoint, {
      query: {
        ...query,
        size: -1,
      },
    });
  };
  const one = (id: string | number) => {
    return useIFetch<DataT>(`${endpoint}/${id}`);
  };
  const create = (body: Record<string, any> | FormData) => {
    return useIFetch<DataT>(endpoint, { method: "POST", body });
  };
  const update = (id: number, body: Record<string, any> | FormData) => {
    return useIFetch<DataT>(`${endpoint}/${id}`, { method: "PUT", body });
  };
  const destroy = (id: number) => {
    return useIFetch(`${endpoint}/${id}`, { method: "DELETE" });
  };

  return {
    pagination,
    paginationPost,
    all,
    create,
    one,
    update,
    destroy,
  };
};
