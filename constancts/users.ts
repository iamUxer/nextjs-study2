export const FILTERS = [
  {
    label: '기본순',
    value: 'default',
  },
  {
    label: '이름순',
    value: 'byname',
  },
  {
    label: '최신순',
    value: 'latest',
  },
];

export const getOrderBy = (orderBy?: string) => {
  return orderBy
    ? orderBy === 'default'
      ? { orderBy: { id: 'asc' } }
      : orderBy === 'byname'
      ? { orderBy: { name: 'asc' } }
      : orderBy === 'latest' && { orderBy: { createdAt: 'desc' } }
    : undefined;
};
