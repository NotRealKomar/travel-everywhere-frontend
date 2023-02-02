export type UrlType = 'auth' | 'app';

export const getApiUrl = (type: UrlType): string =>
  `${process.env.REACT_APP_API_URL}/${type}`;
