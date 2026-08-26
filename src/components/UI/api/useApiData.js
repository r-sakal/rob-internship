import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const useApiData = (
  url,
  {
    params = {},
    deps = [],
    initialData = null,
    enabled = true,
    errorMessage = "Failed to fetch data:",
  } = {}
) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);

  const serializedParams = useMemo(() => JSON.stringify(params || {}), [params]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return undefined;
    }

    let active = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url, { params });
        if (active) {
          setData(response.data);
        }
      } catch (error) {
        console.error(errorMessage, error);
        if (active) {
          setData(initialData);
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
  }, [url, serializedParams, enabled, errorMessage, ...deps]);

  return { data, loading, setData };
};

export default useApiData;