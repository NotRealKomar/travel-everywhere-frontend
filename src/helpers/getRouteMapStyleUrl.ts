export type UrlType = 'auth' | 'app';

export const getRouteMapStylesUrl = (): string => 
  `https://maps.geoapify.com/v1/styles/klokantech-basic/style.json?apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`;
