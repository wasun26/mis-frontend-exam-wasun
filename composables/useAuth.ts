export default () => {
  const endpoint = "auth";
  const api = useRestAPI<any>(endpoint);

  return {
    addAnnualAuditPeriod: async (body: Record<string, any>) => {
      const { error } = await useIFetch(endpoint, {
        method: "POST",
        body,
      });

      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }
    },

    authLogin: async (body: Record<string, any> = {}) => {
      const { data, error, refresh, pending } = await useIFetch<any[]>(
        `${endpoint}/login`,
        {
          method: "POST",
          body,
          immediate: false,
          watch: false,
        }
      );
      if (error.value) {
        throw createError({
          statusCode: error.value.statusCode,
          statusMessage: error.value.statusMessage,
          fatal: true,
        });
      }
      return { data, refresh, pending };
    },

    // getAnnualAuditChecklist: async (body: Record<string, any> = {}) => {
    //   const { data, error, refresh, pending } =
    //     await useIFetch<AnnualAuditChecklist>(`${endpoint}/checklist`, {
    //       method: "POST",
    //       body,
    //       immediate: false,
    //       watch: false,
    //     });
    //   if (error.value) {
    //     throw createError({
    //       statusCode: error.value.statusCode,
    //       statusMessage: error.value.statusMessage,
    //       fatal: true,
    //     });
    //   }
    //   return { data, refresh, pending };
    // },

    // getCheckersApprove: async (configId: number) => {
    //   const { data, error, refresh, pending } =
    //     await useIFetch<CheckersApproveOrganization>(
    //       `${endpoint}/checkers-approve?inspectConfigId=${configId}`,
    //       {
    //         method: "GET",
    //       }
    //     );
    //   if (error.value) {
    //     throw createError({
    //       statusCode: error.value.statusCode,
    //       statusMessage: error.value.statusMessage,
    //       fatal: true,
    //     });
    //   }
    //   return { data, refresh, pending };
    // },

    // getInspectConfigReport: async (configId: number) => {
    //   const { data, error, refresh, pending } = await useIFetch<AssetObject>(
    //     `${endpoint}/report?inspectConfigId=${configId}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   if (error.value) {
    //     throw createError({
    //       statusCode: error.value.statusCode,
    //       statusMessage: error.value.statusMessage,
    //       fatal: true,
    //     });
    //   }
    //   return { data, refresh, pending };
    // },

    // getAnnualAuditInspectConsider: async (query: Record<string, any>) => {
    //   const { data, error, refresh, pending } = await useIFetch<
    //     ListPage<AnnualAuditApproveList[]>
    //   >(`${endpoint}/inspect-consider`, {
    //     method: "GET",
    //     query,
    //     immediate: false,
    //     watch: false,
    //   });
    //   if (error.value) {
    //     throw createError({
    //       statusCode: 500,
    //       statusMessage: error.value.message,
    //       fatal: true,
    //     });
    //   }
    //   watch(query, refresh);

    //   return {
    //     data,
    //     pending,
    //     refresh,
    //     error,
    //   };
    // },

    // getInspectGuideLine: async (
    //   inspectConfigId: number,
    //   considerType: number
    // ) => {
    //   const { data, error, refresh, pending } = await useIFetch<
    //     InspectGuideLine[]
    //   >(
    //     `${endpoint}/inspect-guide-line?inspectConfigId=${inspectConfigId}&considerType=${considerType}`,
    //     {
    //       method: "GET",
    //     }
    //   );
    //   if (error.value) {
    //     throw createError({
    //       statusCode: error.value.statusCode,
    //       statusMessage: error.value.statusMessage,
    //       fatal: true,
    //     });
    //   }
    //   return { data, refresh, pending };
    // },

    // getOrganizeByPermission: async (query: Record<string, any>) => {
    //   const { data, error, refresh, pending } = await useIFetch<
    //     OrganizationByPermission[]
    //   >(`${endpoint}/organizations-dropdown`, {
    //     method: "GET",
    //     query,
    //     immediate: false,
    //     watch: false,
    //   });
    //   if (error.value) {
    //     throw createError({
    //       statusCode: 500,
    //       statusMessage: error.value.message,
    //       fatal: true,
    //     });
    //   }
    //   watch(query, refresh);

    //   return {
    //     data,
    //     pending,
    //     refresh,
    //     error,
    //   };
    // },
  };
};
