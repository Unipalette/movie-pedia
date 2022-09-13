import { useCallback, useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPendig] = useState(false);
  const [error, setError] = useState(null);
  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPendig(true);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPendig(false);
      }
    },
    [asyncFunction]
  );
  return [pending, error, wrappedFunction];
}
export default useAsync;
