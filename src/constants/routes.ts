export const HOME_PAGE_ROUTE = '/';
export const ERROR_PAGE_ROUTE = '/error';
export const ERROR_WITH_STATUS_PAGE_ROUTE = (status: number) =>
  `${ERROR_PAGE_ROUTE}/${status}`;
