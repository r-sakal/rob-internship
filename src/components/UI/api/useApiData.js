import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";

const useApiData = (
  url,
  {
    params = {},
    initialData = null,
    enabled = true,
    errorMessage = "Failed to fetch data:",
  } = {}
) => {
  const initialDataRef = useRef(initialData);
  const [data, setData] = useState(initialDataRef.current);
  const [loading, setLoading] = useState(enabled);

  const serializedParams = useMemo(() => JSON.stringify(params || {}), [params]);
  const stableParams = useMemo(() => JSON.parse(serializedParams), [serializedParams]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url, { params: stableParams });
        if (active) {
          setData(response.data);
        }
      } catch (error) {
        console.error(errorMessage, error);
        if (active) {
          setData(initialDataRef.current);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      active = false;
    };
  }, [url, stableParams, enabled, errorMessage]);

  return { data, loading, setData };
};

export default useApiData;