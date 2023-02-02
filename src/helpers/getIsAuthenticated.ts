export const getIsAuthenticated = () => {
  return localStorage.getItem('accessToken') !== null && localStorage.getItem('userId') !== null;
}