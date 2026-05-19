export function getPagination({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}) {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  return {
    page: safePage,
    limit: safeLimit,
    skip: (safePage - 1) * safeLimit,
  };
}
