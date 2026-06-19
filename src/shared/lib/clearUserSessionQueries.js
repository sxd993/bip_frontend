export const clearUserSessionQueries = (queryClient) => {
  queryClient.removeQueries({ queryKey: ["appeals"] });
  queryClient.removeQueries({ queryKey: ["company-employees"] });
  queryClient.removeQueries({ queryKey: ["company-invites"] });
  queryClient.removeQueries({ queryKey: ["appealDetails"] });
};
