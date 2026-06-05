/**
 * Helper function to perform a fetch request with a specified timeout (default 1000ms).
 * If the request hangs or backend is not available, it aborts the request to trigger the catch fallback.
 */
export const fetchWithTimeout = async (resource, options = {}) => {
  const { timeout = 5000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(resource, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
