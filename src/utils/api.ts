export const getBaseUrl = (): string => {
  return process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
};
