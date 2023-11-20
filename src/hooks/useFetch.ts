import { useEffect, useState } from 'react';
import { PlanetType } from '../utils/type';

type FetchFunction = () => Promise<any[]>;

type UseFetchResult = {
  allPlanets: PlanetType[];
  isLoading: boolean;
  error: string | null;
};

function useFetch(fetchFunction: FetchFunction): UseFetchResult {
  const [allPlanets, setAllPlanets] = useState<PlanetType[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setIsLoading(true);

        const response = await fetchFunction();
        console.log('response em hook fetch: ', response);

        setAllPlanets(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApi();
  }, [fetchFunction]);

  return {
    allPlanets,
    isLoading,
    error,
  };
}

export default useFetch;
