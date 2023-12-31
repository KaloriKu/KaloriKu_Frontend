export const authenticatedFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  return fetch(input, {
    ...init,
    headers: {
      authorization: `Bearer ${localStorage.getItem('access')}`,
      ...init?.headers,
    },
  });
};